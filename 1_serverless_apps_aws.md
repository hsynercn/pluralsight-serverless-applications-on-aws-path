# 1. Introduction to Serverless Architecture on AWS

## 1.1. What We Will Be Building

Fictional document management system.

Define Serverless

It is an approach, to build on modern cloud. 

Serverless Architecture Manifesto
- Speed of innovation over depth of customization
    - We don't want to spend time on maintenance, we need to build new value on business.
- Deferred risk over extensive ownership
    - We defer some risk to servicing provider.
- Cost for actual use over cost for predicted use
    - We don't need to spin up out own data centers.
- Scalability by default over scalability by design
    - We include scalability by default.
- Managed services over custom infrastructure
    - Our provider maintains everything.

Navigating this Learning Path

Core Learning Path Concepts
- Hosting
- Serverless Compute and API's
- Event-based Architectures
- Authentication and Authorization
- Deployment and Production Support

Approaching Core Concepts
- Learning
    - Core services will be introduced and demoed
- Implementing
    - Core services will be implemented into real app

AWS Serverless Services

Compute Services
- AWS Lambda
- AWS Fargate(not included in tutorial)

App Orchestration Services
- Step Functions
- EventBridge
- SQS, Simple Queue Service
- SNS, Simple Notification Service

API Services
- API Gateway
- AppSync(GraphQL)(not included in tutorial)

Data Services
- S3
- DynamoDB
- Aurora Serverless(relational db, not included)
- RDS Proxy(relational db, not included)

Observability Services
- CloudWatch
- X-Ray

AWS Serverless Tools

Third-Party Serverless Tools
- Serverless Framework
- Terroform
- Pulumi
- Claudia.js
- Zappa
- Architect

AWS Serverless Deployment Tools
- CloudFormation
    - You can describe the infrastructure
- Serverless Application Model(SAM)
    - It is similar to CloudFormation
- Cloud Development Kit(CDK)
    - Why Use the CDK for Serverless: enables you to write programmatic code for your infrastructure.
    - Generates CloudFormation templates based on your code.
    - Provides support for packaging of Node.js Lambda functions.
    - Works well in a monorepo structure.
    - Provides pipeline capabilities for Continuous Delivery.

Demo Application Overview

A document management system.

Application Functionality
- Web-based interface
- Upload and process PDF documents
- Secure role-based access
- Implemented with Continuous Delivery

Core Application Components
- Frontend
    - React application built in JavaScript
- Backend
    - Serverless Microservices built in JavaScript
- Infrastructure
    - AWS CDK leveraging TypeScript



