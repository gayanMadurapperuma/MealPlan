import { Function, FunctionProps } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class LambdaFunction extends Function {
    constructor(scope: Construct, id: string, props: FunctionProps){
        super(scope, id, {
            ...props
        });
    }
}