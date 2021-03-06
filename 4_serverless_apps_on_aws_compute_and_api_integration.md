# 4. Serverless Compute and API Integration Approaches on AWS

## 4.1. Serverless Compute

Core Learning Path Concepts
- Hosting
- **Serverless API's and Compute**
- Event-based Architectures
- Authentication and Authorization
- Deployment and Production Support

**Course Services**
- AWS Lambda
- Step Functions
- API Gateway

Serverless Compute Services

AWS Lambda, AWS Fargate

|AWS Lambda|AWS Fargate|
|---|---|
|Billed based on usage (requests and provisioned resources)|Billed based on time (resources deployed for an amount of time)|
|Provides pre-built runtime for common platforms|Utilizes a container that you maintain|
|Requires new tool for local development and deployment|Enables a more traditional development flow with Docker|
|Primary service for integration with other event-driven AWS services|can be run on either ECS (Amazon Elastic Container) or EKS (Elastic Container Service for Kubernetes)|
|Works seamlessly with API Gateway|Works seamlessly with API Gateway|

*"If you look inside Amazon, and you look at all of the new applications that were built in 2020, half of them use **Lambda** as their compute engine."*
-Andy Jassy, CEO AWS

Use Lambda whenever possible.

AWS Lambda Deep Dive

**Launching a Lambda Function**
- Resources:Required*, Define resources that available to this function.
- Runtime and Layer:Required*, Configure runtime and layer you want to use.
- Permissions
- Environment
- Custom Code:Required*

**Lambda Resources**
- Timeout
    - Determines how long the function can run
    - Defaults to 3 seconds
    - Can be up to 15 minutes
- Memory
    - Can be from 128 to 10,240 MB
    - CPU power is allocated based on amount of memory

**Lambda Runtime**
- We need to add a runtime to our Lambda function
- Runtimes
    - Node.js
    - Python
    - Ruby
    - Java
    - . Net Core
    - Custom Runtime
- We can use Lambda Layers for specific needs, like using a locally installed image manipulation tool 
    - Providing additional native or platform libraries
    - Sharing common code between functions
    - Implementing a custom runtime

**Permissions**
- Lambda functions can have an execution role defined which enables them to utilize an IAM role to control access to other AWS services.

**Environment**
- We need to define an environment, we can add ENV variables like dynamo db table names.

**Custom Code**
- This is our custom code, we can use browser editor to add code for our examples.

Key Compute Differences
- Disposable Compute, every function is thrown away after execution.
- Cold Start, first cal takes longer.
- Concurrency, Lambda creates multiple sessions to meet demand.

Working With AWS Lambda

**Demo**
- Create a Lambda function in the console
- Modifying the function configuration
- Deploying changes to function code
- Integrating the function with DynamoDB

1. Go to AWS console Lambda
2. Create function
3. Search on "mobile on "Blueprints and select simple-mobile-backend
4. Name: sampleFunction, Role Name:sampleFunctionRole
5. Create function
6. Go to function's configuration, we can see function has two resources
    - Amazon CloudWatch Logs
    - Amazon DynamoDB
7. Go to DynamoDB
8. Create a new table
9. Table name:SampleTable, Primary key: PK, unselect: Use default settings
10. Go back to sampleFunction, Edit environmental variables
11. Add variable Key:DYNAMO_DB_TABLE Value:SampleTable

At his point we can edit the function code from browser. Changed payload.tableName and enabled console.log lines.

```js
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const operation = event.operation;
    const payload = event.payload;
    
    payload.TableName = process.env.DYNAMO_DB_TABLE;
    
    switch (operation) {
        case 'create':
            return await dynamo.put(payload).promise();
        case 'read':
            return await dynamo.get(payload).promise();
        case 'update':
            return await dynamo.update(payload).promise();
        case 'delete':
            return await dynamo.delete(payload).promise();
        case 'list':
            return await dynamo.scan(payload).promise();
        case 'echo':
            return payload;
        case 'ping':
            return 'pong';
        default:
            throw new Error(`Unrecognized operation "${operation}"`);
    }
};
```

We can test new code with a new test event. Name it "CreateEvent", we are creating a new record.

```json
{
    "operation": "create",
    "payload": {
        "Item": {
            "PK": "id1",
            "FirstName": "David",
            "LastName": "Tucker"
        }
    }
}
```

After executing test we can check DynamoDB and see our new record on table.

## 4.2. AWS Step Functions

Workflow
1. Check File
2. Get Metadata
- Get Thumbnail
- Extract Text
3. Insert into Database

Alert User of Failure: Alert user and clean db

**AWS Step Function**: Step Functions is a serverless orchestration service that lets you combine AWS Lambda functions and other AWS services to build business-critical applications.

Terminology
- **State Machine**: Entire workflow.
- **State**: Individual functions, elements.
- **Task**: Entire input, output of individual element.
- **Transition**: Switch one state to another state.

Workflow Types for Step Functions
|Standard|Express|
|---|---|
|Can last up to one year|Can last up to 5 minutes|
|Priced per state transition|Priced per execution including duration and memory consumption|
|Asynchronous execution|Can be either Asynchronous or Synchronous|
|Workflows executed exactly once|Asynchronous - executed at least once|
||Synchronous - executed at most once|
|Supports all service integrations and patterns|Does not support all async integration models|

Why we use Express?

**For shorter workflows, express workflows can provide significant cost savings.**

Creating Step Functions
- Step Functions are defined using Amazon State Languages
- There are pre-defined task types:
    - Task
    - Pass
    - Choice
    - Wait
    - Parallel, Map
    - Succeed, Fail
- Each task can define how its input and output values will be handled

AWS Service Integrations in Step Functions
- Lambda
- Batch
- DynamoDB
- ECS, Fargate, and EKS
- SNS and SQS
- Glue, EMR, and Athena
- SageMaker
- CodeBuild
- API Gateway
- Step Functions

Working With Step Functions

**Demo**
- Create a basic Step Function
- Testing Step Function executions n the console
- Deploying and testing an integrated Step Function

1. Go to step functions get started
2. Create a function with default settings
3. Monitor the flow
4. Go to Create state machine, Run a sample project with Orchestrate lambda Functions

## 4.3 Amazon API Gateway

Common API Needs
- Authentication, authorization
- Caching
    - In some cases we may want to cache results and prevent going to service every single time
- Disparate Sources
- Audit Trail
- Throttling
- App Firewall

**Amazon API Gateway**: Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale. API developers can create APIs that access AWS or other web services, as well as data stored in the AWS Cloud.

Supported API Types
- REST API
- HTTP API
- WebSocket API

|REST API|HTTP API|
|---|---|
|Usage plans and API keys|Supports OpenID Connect/OAuth 2.0, JSON web tokens|
|API caching|Supports default stage and route configuration|
|Request body transformation|Supports private Application Load Balancers and Cloud Map|
|Request and response validation|$1.00 for first 1 million calls|
|Canary release deployment||
|Support Web Application Firewall||
|$3.50 for first 1 million calls||

For serverless applications, use an HTTPS API unless you have a specific need you can't meet using it.

Working with API Gateway

**Demo**
- Integrating a Lambda function with API Gateway
- Testing an API Gateway API

1. Go to AWS Lambda create new function from Blueprint 'microservice-http-endpoint'
2. Function name: sampleMicroservice, Role name: sampleMicroserviceRole
3. Select Create an API and select HTTP API, security Open
4. Create function
5. Get more suitable code for HTTP API

```js
const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };
    
    const TableName = process.env.DYNAMO_DB_TABLE;
    
    let dynamoDBParams;
    if(event.body) {
        dynamoDBParams = JSON.parse(event.body);
        dynamoDBParams.TableName = TableName;
    }

    try {
        switch (event.requestContext.http.method) {
            case 'DELETE':
                body = await dynamo.delete(dynamoDBParams).promise();
                break;
            case 'GET':
                body = await dynamo.scan({ TableName }).promise();
                break;
            case 'POST':
                body = await dynamo.put(dynamoDBParams).promise();
                break;
            case 'PUT':
                body = await dynamo.update(dynamoDBParams).promise();
                break;
            default:
                throw new Error(`Unsupported method "${event.requestContext.http.method}"`);
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
```
6. Add environment variable, Key:DYNAMO_DB_TABLE, Value:SampleTable
7. Install Postman and create a new GET request with API Gateway URL, send request and expect SampleTable records


