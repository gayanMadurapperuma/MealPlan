import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import * as moment from 'moment';

const client = new DynamoDBClient({ region: 'us-west-2' });

exports.handler = async (): Promise<APIGatewayProxyResult> => {
    try {

        if(!process.env.table){
            throw new Error(`Table information not found`);
        }

        // const queryCommand = new QueryCommand({
        //     TableName: process.env.table,
        //     IndexName: 'mealByDateGSI',
        //     KeyConditions: marshall({
        //         ':mealDate': moment().format('YYYY-MM-DD')
        //     }),
        //     KeyConditionExpression: 'mealDate = :mealDate',
        // });

        // const requlst = await client.send(queryCommand);

        return {
            statusCode: 200,
            body: JSON.stringify({}),
        };
    } catch (error) {
        console.log('====> ERROR', JSON.stringify(error));
        return {
            statusCode: 404,
            body: JSON.stringify(error),
        };
    }
}