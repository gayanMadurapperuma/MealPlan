import {
    aws_dynamodb,
    Stack,
    StackProps
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DynamoDBConstruct } from './construct/dynamodb/table.extends';
import { DynamoDBIndex } from './construct/dynamodb/globalIndex.construct';
import { SNSConstruct } from './construct/sns/sns.construct';

export class MealPreparationStatefull extends Stack {
    public readonly mealTable: DynamoDBConstruct;
    public readonly notification: SNSConstruct;
    constructor(scope: Construct, id: string, props?: StackProps){
        super(scope, id);

        this.mealTable = new DynamoDBConstruct(this, `mealPlanTable`, {
            tableName: `mealPlanTable`,
            partitionKey: {
                name: `id`,
                type: aws_dynamodb.AttributeType.STRING
            },
            stream: aws_dynamodb.StreamViewType.NEW_IMAGE
        });

        new DynamoDBIndex(this, `mealByDateGSI`, {
            indexName: `mealByDateGSI`,
            partitionKey: {
                name: `mealDate`,
                type: aws_dynamodb.AttributeType.STRING,
            },
            table: this.mealTable,
            sortKey: {
                name: `mealtime`,
                type: aws_dynamodb.AttributeType.STRING
            }
        });

        this.notification = new SNSConstruct(this, `mealNotification`, {
            displayName: `mealAdminNotification`,
        })

    }
}