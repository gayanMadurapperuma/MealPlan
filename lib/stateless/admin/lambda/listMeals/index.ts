import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import moment from 'moment';

const client = new DynamoDBClient({ region: 'us-west-2' });

exports.handler = async (): Promise<APIGatewayProxyResult> => {
    try {

        if(!process.env.table){
            throw new Error(`Table information not found`);
        }

        const queryCommand = new QueryCommand({
            TableName: process.env.table,
            IndexName: 'mealByDateGSI',
            KeyConditionExpression: "mealDate = :mealDate",
            ExpressionAttributeValues: marshall({
                ':mealDate': moment().format('YYYY-MM-DD')
            }),
        });

        const { Items } = await client.send(queryCommand);
        
        const values = Items?.map((o) => {
            return unmarshall(o);
        });

        return {
            statusCode: 200,
            body: JSON.stringify({values}),
        };
    } catch (error) {
        console.log('====> ERROR', JSON.stringify(error));
        return {
            statusCode: 404,
            body: JSON.stringify(error),
        };
    }
}