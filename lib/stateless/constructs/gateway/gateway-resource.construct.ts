import { Construct } from 'constructs';
import { Resource, ResourceProps, IResource } from 'aws-cdk-lib/aws-apigateway';

export class ApiGatewayResource extends Resource{
    constructor(scope: Construct, id: string, props: ResourceProps){
        super(scope, id, {
            ...props
        });
        
    }
}