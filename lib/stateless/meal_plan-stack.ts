import {
  Stack,
  StackProps,
  aws_apigateway,
  aws_lambda,
  aws_lambda_nodejs
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { EmployeeConstruct } from './employee';
import { DynamoDBConstruct } from './constructs/dynamoDB';
import { APIGateway } from './constructs/gateway/gateway.construct';
import { ApiGatewayResource } from './constructs/gateway/gateway-resource.construct';
import { SNSConstruct } from './constructs/sns/sns.construct';
import { LambdaFunction } from './constructs/lambda/lambda.construct';
import { AdminConstruct } from './admin';

interface MealPlanProps {
  table: DynamoDBConstruct;
  snsService: SNSConstruct;
  stackProps?: StackProps
}

export class MealPlanStack extends Stack {
  constructor(scope: Construct, id: string, props: MealPlanProps) {
    super(scope, id);

    const gateway = new APIGateway(this, `mealPlanGateway`, {
      restApiName: `mealPlanAPI`,
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
      }
    });

    const employeeAPIResource = new ApiGatewayResource(this, `employeeResource`, {
      parent: gateway.root,
      pathPart: 'employee'
    });

    const adminAPIResource = new ApiGatewayResource(this, `adminResource`, {
      parent: gateway.root,
      pathPart: 'admin'
    });

    new AdminConstruct(this, `adminConstruct`, {
      table: props.table,
      gateway: adminAPIResource,
      notificationService: props.snsService
    })

    new EmployeeConstruct(this, `employeeConstruct`, {
      table: props.table,
      gateway: employeeAPIResource,
    });

    // const clenLambda = new LambdaFunction(this, `cleanInitialFunc`, {
    //   functionName: `cleanInitialFunc`,
    //   runtime: aws_lambda.Runtime.NODEJS_16_X,
    //   handler: 'index.handler',
    //   code: aws_lambda.Code.fromAsset(path.join(__dirname, './src/adapters/primary/submit-meal-plan'), {
    //     exclude: ['*.ts']
    //   }),
    //   environment: {
    //     table: props.table.tableName
    //   }
    // });

    // const nodeLambda = new aws_lambda_nodejs.NodejsFunction(this, `nodeClenInitial`, {
    //   runtime: aws_lambda.Runtime.NODEJS_16_X,
    //   entry: path.join(__dirname, './src/adapters/primary/submit-meal-plan/index.ts'),
    //   handler: 'submitMealPlan',
    //   bundling: {
    //     minify: true,
    //     nodeModules: ['uuid', 'moment', '@aws-sdk/client-dynamodb', '@aws-sdk/util-dynamodb'],
    //     externalModules: ['aws-sdk']
    //   },
    //   environment: {
    //     table: props.table.tableName
    //   }
    // })

    // props.table.grantWriteData(nodeLambda);
    // employeeAPIResource.addMethod('POST', new aws_apigateway.LambdaIntegration(nodeLambda));

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'MealPlanQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
