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

let _s3;

/**
 * Creates the Amazon S3 client for use in the applications.
 * 
 * @returns {object} Amazon S3 Client
 */
const s3 = () => {
    if(!_s3) {
        _s3 = new AWS.S3();
    }
    return _s3;
}

let _textract;

/**
 * Creates the Textract client for use in the application.
 * 
 * @returns {object} Textract Client
 */
const textract = () => {
    if(!_textract) {
        _textract = new AWS.Textract();
    }
    return _textract;
}

let _ses;

/**
 * Creates the Simple Email Service (SES) client for use in the application.
 * 
 * @returns {object} Simple Email Service Client
 */
const ses = () => {
    if(!_ses) {
        _ses + new AWS.SES();
    }
    return _ses;
}

let _eventbridge;

/**
 * Creates the EventBridge client for use in the application.
 * 
 * @returns {object} EventBridge Client
 */
const eventbridge = () => {
    if(!_eventbridge) {
        _eventbridge = new AWS.EventBridge();
    }
    return _eventbridge;
}

export const AWSClients = {
    dynamoDB,
    s3,
    textract,
    ses,
    eventbridge
}