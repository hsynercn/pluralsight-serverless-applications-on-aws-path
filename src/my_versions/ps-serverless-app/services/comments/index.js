import {
    createRouter,
    RouterType,
    Matcher
} from 'lambda-micro';
import { AWSClients, generateID } from '../common';

//Utilize the DynamoDB Document Client
const dynamoDB = AWSClients.dynamoDB();
const tableName = process.env.DYNAMO_DB_TABLE;