import { Construct } from 'constructs';
import { EventBus, EventBusProps } from 'aws-cdk-lib/aws-events';

export class Event extends EventBus {
    constructor(scope: Construct, id: string, props: EventBusProps) {
        super(scope, id, {
            ...props
        });
    }
}