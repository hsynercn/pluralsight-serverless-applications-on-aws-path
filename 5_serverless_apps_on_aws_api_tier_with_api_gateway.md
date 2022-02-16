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

DynamoDB Fundamentals

**Amazon DynamoDB**: Amazon DynamoDB is a key-value and documents database that delivers single-digit millisecond performance at any scale. It is a fully managed, multi-region, multi-active, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications. DynamoDB can handle more than 10 trillion request per day and can support peaks of more than 20 million requests per second.

Amazon DynamoDB Concepts
- NoSQL database
- Billed by provisioned capacity or on-demand(per request)
- Supports either eventually consistent or strongly consistent reads
- Enables different data modeling approaches over relational databases

Getting Data From DynamoDB
- Query, this is the efficient way
- Scan, has to read all the data, they are expensive

Working with DynamoDB

Common Modeling Approaches
- Entity per Table: Documents in one tabla, comments in one table.
- Single Table: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-modeling-nosql-B.html

Primary Key
- Composed of a partition key and an optional sort key
- The partition key is used to determine what partition data will be stored on
- Primary keys must be unique
- If using a sort key, you can have multiple items with the same partition key
- When using a sort key, you can sort or query by values as well as beginning characters

Enable the Data Model
- Sortable ID's, we are going to use a KSUID for this
- Global Secondary Index


**KSUID**(Key Sortable Unique IDs): An approach for creating K-sortable unique ID's which allows for ID's that can be sorted by the timestamp of when they are generated.

Global Secondary Indexes(GSI)
- Supports the ability to pick two different values from the table as the PK and SK
- Eventually consistent with the original table
- You can select some or all of the attributes to be added the GSI
- Common pattern is to reverse the PK and SK on the GSI
- There is a default quota of 20 GSI's per table
- Using a GSI consumes throughput

App Access Patterns
|Description|Index|Query|
|---|---|---|
|Get all documents for a department|GSI1|PK="Doc#Marketing", SK sort|
|Get a document|Table|PK=<document id>, SK begins_with "Doc"|
|Get all comments for a document|Table|PK=<document id>, SK begins_with "Comment"|

Creating a Dynamo DB Table

**Demo**
- Creating a DynamoDB Table with the CDK
- Creating a GSI with the CDK
- Creating a utility function to generate sortable ID's

We define the database with CDK.

```ts
import * as cdk from "@aws-cdk/core";
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class AppDatabase extends cdk.Construct {
    public readonly documentsTable: dynamodb.ITable;

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        const documentsTable = new dynamodb.Table(this, 'DocumentsTable', {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            partitionKey: {
                name: 'PK',
                type: dynamodb.AttributeType.STRING,
            },
            sortKey: {
                name: 'SK',
                type: dynamodb.AttributeType.STRING,
            }
        });

        documentsTable.addGlobalSecondaryIndex({
            indexName: 'GSI1',
            partitionKey: {
                name: 'SK',
                type: dynamodb.AttributeType.STRING,
            },
            sortKey: {
                name: 'PK',
                type: dynamodb.AttributeType.STRING,
            },
            projectionType: dynamodb.ProjectionType.INCLUDE,
            nonKeyAttributes: ['DateUploaded', 'Processed', 'Thumbnail', 'Uploader', 'FileSize', 'Name', 'Owner'],
        });
        this.documentsTable = documentsTable;
    }
}
```

**We are using flipped keys for GSI partition key and sort key.**

Every item in DynamoDB must have a unique primary key. The primary key is the base table index. A primary key must have a partition key and can optionally have a range key (also called a sort key). Within a partition, items are ordered by range key. Accessing items using a partition key is fast.

Secondary indexes allow you to query the table using an alternative key. **A Local Secondary Index (LSI)** has the same partition key as the primary key (index), but a different range key. The way to think about an LSI is that its the same data as the primary index (key), just ordered by a different attribute.

**A Global Secondary Index (GSI)** has a different partition key to primary key and is therefore a different set of data.

One of the important differences between LSI and GSI is that an LSI takes its throughput capacity from the base table, where as you have purchase GSI throughput capacity separately. Put another way, an LSI cost you nothing and a GSI incurs extra cost over your base table.

Usually:

**PRIMARY KEY** = **PARTITION KEY** + **RANGE KEY**

Using Lambda Micro
- It is a specific framework.

**Demo**
- Importing needed packages
- Configuring routes
- Implementing needed logic per route





## 5.2. Integrating with API Gateway


