# 3. Implementing Serverless Web Application Hosting and Delivery on AWS

## 3.1. Implementing Web App Hosting

This section covers **Hosting** core concept.

Core Learning Path Concepts
- **Hosting**
- Serverless Compute and API's
- Event-based Architectures
- Authentication and Authorization
- Deployment and Production Support


Demo
- Review where to find the learning path git repository
- Utilizing the learning path branch structure

Get starting branch from https://github.com/davidtucker/ps-serverless-app/tree/p1.

**Monorepo:** A repository that includes all elements for an applications (or multiple applications) inside a single repository including frontend code, backend code, and infrastructure definition.

To manage the monorepo, we will be using yarn instead of npm.

Workspace definitions:
```json
{
    "name": "ps-serverless-app",
    "private": true,
    "workspace": [
        "infrastructure",
        "webapp",
        "services/*"
    ],
    ...
}
```

We define workspaces, and they are going to have their own package.json files.

One of our json files:
```json
{
  "name": "@ps-serverless/infrastructure",
  "version": "0.1.0",
  "bin": {
    "infrastructure": "bin/infrastructure.js"
  },
  "devDependencies": {
      ...
  },
  "dependencies": {
      ...
  }
}
```

Yarn can handle these subprojects within monorepo.

Working With Yarn Workspace

```
# Adding a dependency within a specific workspace
yarn workspace <workspace name> add <package name>

# Adding a dependency within a specific workspace
yarn workspace <workspace name> add <package name> -D

# Adding a dependency to the root of the monorepo (must be in the root directory)
yarn add <package name> -W

# Install all dependencies (must be in the root directory)
yarn
```

**Demo**
- Installing yarn
- Installing project dependencies
- Exploring he initial state of the repository
- Review he structure of each application element

Steps

Execute 'npm install yarn -g' then execute 'yarn' to install.

Wiki Definition: **Infrastructure as code**: Infrastructure as code (IaC) is the managing and provisioning of infrastructure through code instead of through manual processes. Version control is an important part of IaC, and your configuration files should be under source control just like any other software source code file.

Main directories of the project:
- Infrastructure: We have infrastructure as code in this module.
- Services: Put backend microservices.
- Webapp: React web application of this project. Also includes mock data for backend.

Go to Webapp by 'cd Webapp' and execute 'yarn start'. You can see a mock application without a backend.

Creating and Deploying S3 Buckets

**Demo**
- Bootstrapping AWS account for the CDK
- Deploying the initial state of the infrastructure
- Adding in multiple S3 buckets
- Deploying the buckets and verifying in the AWS console

Enable AWS profile on CLI, https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html. Create a new user and import it.

After successful user import we can see new user under 'aws configure list-profiles' command results, set active user with Linux:'export AWS_PROFILE=pluralsight_demo', Windows:'set AWS_PROFILE=pluralsight_demo'.

If some misconfiguration occurs just delete the CloudFormation stack from designated region, in below case it is us-east-1, https://console.aws.amazon.com/cloudformation/home?region=us-east-1.
```
env CDK_NEW_BOOTSTRAP=1 npx cdk bootstrap --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://888544668391/us-east-1
```

Under infrastructure bin/infrastructure.ts is the entry point. Under this file we use ApplicationStack from lib\core.

Go to /infrastructure folder with bash, run **'npx cdk deploy'**

With this command we need to see as result.

```
 ✅  ApplicationStack

Outputs:
ApplicationStack.TestOutput = Hey, it worked!
```

Also, we can see the results from CloudFormation>Stacks>ApplicationStack>Outputs as "Hey, it worked!".

For our application we are going to create 3 S3 buckets, one them for hosting our web application.

We added a new TS file, storage.ts.

```ts
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class AssetStorage extends cdk.Construct {
    public readonly uploadBucket: s3.IBucket;
    public readonly hostingBucket: s3.IBucket;
    public readonly assetBucket: s3.IBucket;

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        this.uploadBucket = new s3.Bucket(this, "UploadBucket", {
            encryption: s3.BucketEncryption.S3_MANAGED
        });

        this.assetBucket = new s3.Bucket(this, "AssetBucket", {
            encryption: s3.BucketEncryption.S3_MANAGED
        });

        this.hostingBucket = new s3.Bucket(this, "WebHostingBucket", {
            encryption: s3.BucketEncryption.S3_MANAGED
        });

    }
}
```

And used new class on index.ts.
```ts
import * as cdk from '@aws-cdk/core';
import {AssetStorage} from './storage' 
export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new AssetStorage(this, 'Storage');
  }
}
```

Finally, run again **'npx cdk deploy'**. After UPDATE_COMPLETE we need to see three new storage under Resources.

Deploying a CloudFront Distribution

**Demo**
- Create a CloudFront distribution using the CDK
- Configuring a CloudFront distribution for a single-page web app

We need to add CloudFront with s3 bucket. We pass props.hostingBucket with props parameter.

```ts
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import { execSync } from 'child_process';
import * as path from 'path';

interface WebAppProps {
    hostingBucket: s3.IBucket;
}

export class WebApp extends cdk.Construct {
    public readonly webDistribution: cloudfront.CloudFrontWebDistribution;

    constructor(scope: cdk.Construct, id: string, props: WebAppProps) {
        super(scope, id);

        const oai = new cloudfront.OriginAccessIdentity(this, "WebHostingOAI", {});

        const cloudfrontProps: any = {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: props.hostingBucket,
                        originAccessIdentity: oai,
                    },
                    behaviors: [{isDefaultBehavior: true}]
                }
            ],
            errorConfigurations: [
                {
                    errorCachingMinTtl: 86400,
                    errorCode: 403,
                    responseCode: 200,
                    responsePagePath: '/index.html',
                },
                {
                    errorCachingMinTtl: 86400,
                    errorCode: 404,
                    responseCode: 200,
                    responsePagePath: '/index.html',
                }
            ]
        }

        this.webDistribution = new cloudfront.CloudFrontWebDistribution(
            this,
            'AppHostingDistribution',
            cloudfrontProps
        );

        props.hostingBucket.grantRead(oai);

    }
}
```

And change index.ts to use our new class.

```ts
import * as cdk from '@aws-cdk/core';
import { AssetStorage } from './storage';
import { WebApp } from './webapp';

export class ApplicationStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const storage = new AssetStorage(this, 'Storage');
    new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket
    });
  }
}
```

After executing 'npx cdk deploy' we need to confirm authorizations. It will take 15 minutes.

Building and Deploying the React Web App

**Demo**
- Review the build process for the React app
- Add in an S3 deployment that build the React app using the CDK

**Important** Execute set NODE_OPTIONS=--openssl-legacy-provider to run 'yarn build'.


