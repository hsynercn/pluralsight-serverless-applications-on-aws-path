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

Preparing Your Computer for This Path
- Reviewing the prerequisites that need to be installed
- Installing the AWS SAM and CDK

Install LTS(Long Term Support) version.

Check versions with 'node -v' and 'npm -v' and 'npm install aws-cdk -g'. Check version with 'cdk --version'.

Install SAM(Serverless Application Model) from https://aws.amazon.com/tr/serverless/sam/, install prerequisites AWS Command Line Interface from https://aws.amazon.com/tr/cli/ and Docker from https://docs.docker.com/get-docker/.

Check 'aws --version' and 'docker -v'. Install SAM and check with 'sam --version'.

## 1.2. Benefits and Challenges of Serverless

Understanding the Benefits of Serverless

Core Benefits of Serverless
- Costs are directly tied to usage
- Reduced maintenance over the life of the application
- Scalability is built-in to the services you use
- Eases integration into new technologies
- Risk and compliance mitigation

 To achieve the benefits of serverless, you will have to change the way you create applications. 

Cost Tied to Usage

| Using MySQL on RDS | Using DynamoDB |
| :---: | :---: |
| Identify a base instance type for expected load | Start off in an on-demand mode, which allows you to pay per request |
| Scaling must be configured and will provide stair steps in cost | Scaling is build-in, while costs will still map to requests linearly |
| To provide high-availability additional costs will occur | High-availability is built into the application at the same cost point |


Reduced Maintenance

|  | Infrastructure as a Service(IaaS) | Platform as a Service(PaaS) | Container as a Service(CaaS) | Function as a Service(FaaS) | Software as a Service(SaaS) |
| :---: | :---: | :---: | :---: | :---: | :---: |
|Applications|self-managed|self-managed|self-managed|self-managed, platform-managed|platform-managed|
|Data|self-managed|self-managed|self-managed|self-managed, platform-managed|platform-managed|
|OS|self-managed|platform-managed|self-managed, platform-managed|platform-managed|platform-managed|
|Hardware|platform-managed|platform-managed|platform-managed|platform-managed|platform-managed|

Function as a Service and Software as a Service greatly reduces maintenance costs.

Lambda: Just upload your code and Lambda takes care of everything required to run and scale your code with high availability.

Emerging technology Adoption
- DynamoDB enables organizations to adopt NoSQL scalability without infrastructure.
- AI Services enable developers to utilize AI and ML without custom model creation. 
- QLDB provides a cryptographically verified ledger that is fully managed.
- AWS IoT provides a suite of IoT services to enable deployment and analysis of sensors.

Compliance and Risk
- All services should be analyzed for compliance
- Serverless enables less custom code
- Leads to organizations owning less risk
- Key areas of risk can be transferred to the provider

Serverless Economics
- Architects will need to have knowledge of cost for serverless services on AWS.
- This requires continual educations on service changes and new offerings.
- Organizations adopting serverless should include cost analysis in development process.
- Poorly architecting an application in the cloud can be a costly mistake.

When Native Serverless Isn't the Right Fit
- Resource Intensive Workflows
    - Lambda has specific limits on compute resources and time.
    - Some tasks cannot easily fit within the constraints.
    - Serverless approaches may assist in orchestration of these workloads.
- Vendor Agnostic(saticidan bagimsiz)
    - We need to fundamentally rethink the discussion around vendor lock-in.
    - We can't build something to get both of the benefits' of DynamoDB on AWS and Cosmos DB on Azure.
    - Working on an abstraction layer means you won't experience all cloud benefits.
    - This decision should be tied to your core goals as an organization.
    - Many of these solutions require additional maintenance.
- Multi-cloud
    - Many services do not translate across providers.
    - Some thirds-party frameworks solve for this.
    - Ideally an app should be built for a single platform.
- Existing Toolset
    - Serverless development will require new tools and approaches for most all of the development chain.


