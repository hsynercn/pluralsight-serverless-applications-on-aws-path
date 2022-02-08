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
    - .Net Core
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

## 4.2. AWS Step Functions

## 4.3 Amazon API Gateway


