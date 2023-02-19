import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDBConstruct extends dynamodb.Table {
  constructor(scope: Construct, id: string, props: dynamodb.TableProps) {
    super(scope, id, {
      ...props
    });
  }
}