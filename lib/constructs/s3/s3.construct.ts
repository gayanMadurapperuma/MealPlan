import { Construct } from 'constructs';
import { Bucket, BucketProps } from 'aws-cdk-lib/aws-s3';

export class S3Bucket extends Bucket {
    constructor(scope: Construct, id: string, props: BucketProps) {
        super(scope, id, {
            ...props
        });
    }
}