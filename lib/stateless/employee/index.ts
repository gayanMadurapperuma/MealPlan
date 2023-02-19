import {
    aws_lambda,
    aws_apigateway
  } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { LambdaFunction } from '../constructs/lambda/lambda.construct';
import { DynamoDBConstruct } from '../constructs/dynamoDB';
import { ApiGatewayResource } from '../constructs/gateway/gateway-resource.construct';

interface EmployeeProps {
    table: DynamoDBConstruct,
    gateway: ApiGatewayResource
}

export class EmployeeConstruct extends Construct{
    constructor(scope: Construct, id: string, props: EmployeeProps){
        super(scope, id);

        const submitMeal = new LambdaFunction(this, `submitEmployeeMeal`, {
            functionName: `submitEmployeeMeal`,
            runtime: aws_lambda.Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: aws_lambda.Code.fromAsset(path.join(__dirname, './lambda/requestMeal'), {
              exclude: ['*.ts']
            }),
            environment: {
                table: props.table.tableName
            }
        });

        props.table.grantWriteData(submitMeal);
        props.gateway.addMethod('POST', new aws_apigateway.LambdaIntegration(submitMeal));

    }
}