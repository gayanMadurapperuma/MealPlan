import { Construct } from 'constructs';
import { Topic, TopicProps } from 'aws-cdk-lib/aws-sns';

export class SNSConstruct extends Topic {
    constructor(scope: Construct, id: string, props: TopicProps) {
        super(scope, id, {
            ...props
        });
    }
}