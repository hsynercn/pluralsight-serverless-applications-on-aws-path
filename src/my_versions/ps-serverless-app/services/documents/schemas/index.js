/**
 * Document Service
 * 
 * This is a microservice example form David Tucker's Pluralsight course.
 */

import * as path from 'path';
import * as url from 'url';
import {
    validatePathVariables,
    validateMultipartFormData,
    parseMultipartFormData,
    createRouter,
    RouterType,
    Matcher,
} from 'lambda-micro';
import { AWSClients, generateID } from '../../common';

//setup S3 client
const s3 = AWSClients.s3();

//utilize the DynamoDB document client
const dynamoDB = AWSClients.dynamoDB();
const tableName = process.env.DYNAMO_DB_TABLE;

//use JSON schemas to validate requests
const schemas = {
    idPathVariable: require('./schemas/idPathVariable.json'),
    createDocument: require('./schemas/createDocument.json'),
}
