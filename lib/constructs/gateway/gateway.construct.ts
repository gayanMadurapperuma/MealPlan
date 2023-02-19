import { Construct } from 'constructs';
import { RestApi, RestApiProps } from 'aws-cdk-lib/aws-apigateway';

export class APIGateway extends RestApi {
    constructor(scope: Construct, id: string, props: RestApiProps) {
        super(scope, id, {
            ...props
        });
    }
}