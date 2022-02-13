# 5. Building a Serverless API Tier with Amazon API Gateway

## 5.1. Creating Serverless Services

What We will Be Doing
- AWS Lambda
- API Gateway

Application Services
- Documents, DynamoDB
- Comments, DynamoDB
- Moderation, SQS
- Users, Cognito
- Notifications, No Data Storage

In This Course
- Creating comments service
- Creating moderation service, but it will not be fully built out
- Exploring DynamoDB design approach
- reviewing framework for routing with AWS Lambda

Setting up the Code Base

**Demo**
- Creating the directory structure for services
- Creating a directory for common code that will be used across services

Related starting repo is https://github.com/davidtucker/ps-serverless-app/tree/p2 ending is p3.

1. Use 'service' folder. 
2. Add a common folder to store common logic between services and add a package.json file. Add an index.js file.
3. Add a comment folder, add a package.json file. Add an index.js file.


## 5.2. Integrating with API Gateway


