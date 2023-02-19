import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 } from 'uuid';
import moment from 'moment';
import { mealPlanSubmitProps } from '@models/types';

const client = new DynamoDBClient({ region: 'us-west-2' });

export const submitMealPlan = async ({ body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        console.log('===> BODY', JSON.stringify(body));

        if(!process.env.table) {
            throw new Error(`table name not found`);
        }

        if(!body){
            throw new Error('required information not found');
        }

        console.log('====> HIT HERE');

        // const submitMealPlan: mealPlanSubmitProps = JSON.parse(body);



        const saveMeal = new PutItemCommand({
            TableName: process.env.table,
            Item: marshall({
                id: v4(),
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('HH:mm:SS'),
                ...JSON.parse(body)
            })
        });

        await client.send(saveMeal);
        
        return {
            statusCode: 200,
            body: JSON.stringify({}),
        };

    } catch (error) {
        console.log('===> ERROR', JSON.stringify(error));
        return {
            statusCode: 404,
            body: JSON.stringify(error),
        }
    }
}