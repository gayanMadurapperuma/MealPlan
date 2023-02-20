import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 } from 'uuid';
import moment from 'moment';
import { z } from 'zod';

const client = new DynamoDBClient({ region: 'us-west-2' });

exports.handler = async ({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        if(!process.env.table){
            throw new Error(`Table information not found`);
        }

        if(!body){
            throw new Error(`Required information not found`);
        }

        const saveMeal = new PutItemCommand({
            TableName: process.env.table,
            Item: marshall({
                id: v4(),
                mealDate: moment().format('YYYY-MM-DD'),
                mealtime: moment().format('HH:mm:SS'),
                ...JSON.parse(body)
            })
        });

        await client.send(saveMeal);

        return {
            statusCode: 200,
            body: JSON.stringify({}),
        };
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify(error),
        };
    }
}