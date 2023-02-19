import { Construct } from 'constructs';
import { aws_dynamodb } from 'aws-cdk-lib';

export class DynamoDBIndex extends Construct{

    public readonly table: aws_dynamodb.Table;

    constructor(scope: Construct, id: string, props: {
        indexName: string,
        table: aws_dynamodb.Table,
        partitionKey: aws_dynamodb.Attribute,
        sortKey?: aws_dynamodb.Attribute,
    }){
        super(scope, id);
        this.table = props.table;

        this.table.addGlobalSecondaryIndex({
            indexName: props.indexName,
            partitionKey: props.partitionKey,
            sortKey: props.sortKey
        })

    }
}