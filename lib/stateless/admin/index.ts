import {
    aws_lambda,
    aws_apigateway,
    aws_lambda_event_sources
  } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { LambdaFunction } from '../constructs/lambda/lambda.construct';
import { DynamoDBConstruct } from '../constructs/dynamoDB';
import { ApiGatewayResource } from '../constructs/gateway/gateway-resource.construct';
import { SNSConstruct } from '../constructs/sns/sns.construct';

interface AdminProps {
    table: DynamoDBConstruct;
    gateway: ApiGatewayResource;
    notificationService: SNSConstruct
}

export class AdminConstruct extends Construct {
    constructor(scope: Construct, id: string, props: AdminProps){
        super(scope, id);

        const listMeals = new LambdaFunction(this, `adminListMeals`, {
            functionName: `adminListMeals`,
            runtime: aws_lambda.Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: aws_lambda.Code.fromAsset(path.join(__dirname, './lambda/listMeals'), {
              exclude: ['*.ts']
            }),
            environment: {
                table: props.table.tableName
            }
        });

        props.table.grantReadData(listMeals);
        props.gateway.addMethod('GET', new aws_apigateway.LambdaIntegration(listMeals));

        const notifyAdmin = new LambdaFunction(this, `adminNotify`, {
            functionName: `adminNotify`,
            runtime: aws_lambda.Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: aws_lambda.Code.fromAsset(path.join(__dirname, './lambda/notifyAdmin'), {
              exclude: ['*.ts']
            }),
            environment: {
                topicArn: props.notificationService.topicArn
            }
        });

        props.notificationService.grantPublish(notifyAdmin)

        notifyAdmin.addEventSource(new aws_lambda_event_sources.DynamoEventSource(props.table, {
            startingPosition: aws_lambda.StartingPosition.LATEST
        }));

        props.table.grantStreamRead(notifyAdmin);
        
        // props.table.grantStreamRead()

    }
}