import { DynamoDBStreamEvent } from 'aws-lambda';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const client = new SNSClient({ region: 'us-west-2' });

exports.handler = async (e: DynamoDBStreamEvent) => {
    try {

        if(!process.env.topicArn){
            throw new Error(`TopicArn not found`);
        }

        console.log('===> EVENT', JSON.stringify(e));

        const { Records } = e;
        const items = Records.map((o) => {
            const { dynamodb } = o;
        })

        const commond = new PublishCommand({
            TopicArn: process.env.topicArn,
            Subject: `New Meal from Employee`,
            Message: JSON.stringify(e)
        });
        await client.send(commond);
    } catch (error) {
        throw error;
    }
}