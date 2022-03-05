# 6. Serverless Event-based Application Architecture

## 6.1. Event-based Architecture

**Intro**

Current course progress location:

Core Learning Path Concepts
- Hosting
- Serverless compute and API's
- **Event-based Architectures** < Current topic
- Authentication and Authorization
- Deployment and Production Support

Course Services
- EventBridge
- SQS (Simple Queue Service)
- SNS (Simple Notification Service)

Event-based Services in AWS

**Amazon EventBridge**

Amazon EventBridge is a serverless event bus that makes it easier to build event-driven applications at scale using events generated from your applications, integrated Software-as-a-Service (SaaS) applications, and AWS services.

**Amazon SQS**

Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. 

SQS Queue Types
- Standard
    - Guarantees "at least once" delivery to consumer
    - No guarantee of message delivery order
- FIFO
    - Stands for "first-in first-out"
    - Provides a guarantee on message delivery order
    - Guarantees "exactly once" delivery to consumer

**Amazon SNS**

Amazon Simple Notification Service (Amazon SNS) is a fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication.

SNS Topic Types
- Standard
- FIFO

**Using Event-based Services**

Demo
- Creating an EventBridge rule
- Triggering a Lambda function when uploading to an S3 bucket

Steps
1. Crete a S3 bucket, "eventbased-testing-hsynerc", use default values
2. Create a lambda, use blueprint, "eventbased-testing-function", log the event
```js
exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
};
```
3. Create a rule on EventBridge 
    - Name: "upload-rule-hsynerc"
    - Check Pre-defined pattern by service
    - Service provider: AWS
    - Service name: Simple Storage Service (S3)
    - Event type: Object-Level API Call via CloudTrail
    - Check Specific Operation
    - Add PutObject
    - Check Specific buckets(s) by name
    - Select "eventbased-testing-hsynerc" function for target

