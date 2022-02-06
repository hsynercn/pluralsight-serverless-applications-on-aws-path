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