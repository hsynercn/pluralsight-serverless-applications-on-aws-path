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

## 4.2. AWS Step Functions

## 4.3 Amazon API Gateway


