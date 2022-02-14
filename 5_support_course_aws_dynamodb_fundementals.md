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

