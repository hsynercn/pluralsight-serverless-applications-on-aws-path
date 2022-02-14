# 5. Support: AWS DynamoDB Fundamentals

## 5.1. Course Overview
- Features of DynamoDB
- Backing up tables
- Active and passive monitoring
- Interacting with DynamoDB items

You will be to design reliable and cost-effective DynamoDB tables.

## 5.2. Creating Simple DynamoDB Tables

Basic DynamoDB Components
- Fully managed noSQL database service
- Designed with elasticity in mind
- Highly redundant data storage

Basic Table Components
- Item: An item is a group of attributes.
- Attribute: Each item is composed of one or more attributes.
- Table: A table is a collection of data.

DynamoDB Primary Keys

Sample item:
```json
{
    "Name": "Bob",
    "Age": 26,
    "Company": "Globomantics",
    "Position": "DevOps"
}
```

When we create a table, in addition to the table name, you must specify the primary key of the table, The primary key uniquely identifies each item in the table, so that no two items can have the same key.

**DynamoDB supports two different kinds of primary keys**
- **Partition Key**: A simple primary key, composed of one attribute known as the partition key. In a table that has only a partition key, no two items can have the same partition key value.
- **Partition Key and Sort Key**: Referred to as a composite primary key, this type of the key is composed of two attributes. The first attribute is the partition key, and the second attribute is the sort key.

Allowed Datatypes
- Scalar: One value at a time
- Document: Multiple values of different types
- Set: Multiple values of the same type

**Scalar**
- String
- Integer
- Null
- Boolean
```json
{
    "Name": "Bob",
    "Age": 26,
    "Company": null,
    "Employed": false
}
```

**Document**
- List
- Map
- Set
- Binary

## 5.3. Creating Elaborate DynamoDB Tables

Storage Consistency

Planning Table Throughput Capacity
- Write Capacity Units (WCU): 1 write operation per second of 1 KB
- Read capacity Units (RCU): 1 or 2 read operation per second of 4KB

**Eventually Consistent Reads**: Applications that do not immediately query updated items.
**Strongly Consistent Reads**: Applications that do immediately query updated items.

|Provisioned Autoscaling|On-demand Autoscaling|
|---|---|
|Predict traffic patterns|Unpredictable traffic patterns|
|Paying for provisioned capacity|Paying for amount of requests|
|Capping performance and price|Unlimited performance and price|

Secondary Indexes

Primary key is composed of a partition key called Name and a sort key called Age.
```json
{
    "Name": "Bob",
    "Age": 26,
    "Company": "Globo",
    "Position": "DevOps"
}
```

If we want to access date with Company and Position we can use secondary indexes. They improve data accessibility of items in our table.

