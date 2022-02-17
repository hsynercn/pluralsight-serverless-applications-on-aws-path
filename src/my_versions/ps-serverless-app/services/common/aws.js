/**
 * This file exports functions to create each of the AWS clients that will be used throughout applications. 
 * By having all of these in one locations, it will be easier to implement tracing for AWS service calls. 
 */

import * as AWS from 'aws-sdk';

let _dynamoDB;

const dynamoDB = () => {
    if(!_dynamoDB) {
        _dynamoDB = new AWS.DynamoDB.DocumentClient();
    }
    return _dynamoDB;
}

export const AWSClients = {
    dynamoDB,
}