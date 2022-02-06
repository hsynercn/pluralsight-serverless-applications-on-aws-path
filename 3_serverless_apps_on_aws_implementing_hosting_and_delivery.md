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

Go to Webapp by 'cd Webapp' and execute 'yarn start'.