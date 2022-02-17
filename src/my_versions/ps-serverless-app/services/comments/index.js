import {
    createRouter,
    RouterType,
    Matcher,
    validatePathVariables,
    validateBodyJSONVariables
} from 'lambda-micro';
import { AWSClients, generateID } from '../common';

const schemas = {
    createComment: require('./schemas/createComment.json'),
    deleteComment: require('./schemas/deleteComment.json'),
    getComments: require('./schemas/getComments.json'),
}

//Utilize the DynamoDB Document Client
const dynamoDB = AWSClients.dynamoDB();
const tableName = process.env.DYNAMO_DB_TABLE;

const getAllCommentsForDocument = async (request, response) => {
    const params = {
        TableName: tableName,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': request.pathVariables.docid,
            ':sk': 'Comment'
        }
    };
    const results = await dynamoDB.query(params).promise();
    return response.output(results.Items, 200);
}

const createComment = async (request, response) => {
    const userId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    const commentId = `Comment${generateID()}`;
    const item = {
        PK: request.pathVariables.docid,
        SK: commentId,
        DateAdded: new Date().toISOString(),
        Owner: userId,
        ...JSON.parse(request.event.body),
    }
    const params = {
        TableName: tableName,
        Item: item,
        ReturnValues: 'NONE'
    };
    await dynamoDB.put(params).promise();
    return response.output(item, 200);
}

const deleteComment = async (request, response) => {
    const params = {
        TableName: tableName,
        Key: {
            PK: request.pathVariables.docid,
            SK: `Comment#${request.pathVariables.commentId}`,
        },
    };
    await dynamoDB.delete(params).promise();
    return response.output({}, 200);
}

const router = createRouter(RouterType.HTTP_API_V2);

router.add(
    Matcher.HttpApiV2('GET', '/comments/(:docid)'),
    validatePathVariables(schemas.getComments),
    getAllCommentsForDocument,
);

router.add(
    Matcher.HttpApiV2('GET', '/comments/(:docid)'),
    validateBodyJSONVariables(schemas.createComment),
    createComment,
);

router.add(
    Matcher.HttpApiV2('GET', '/comments/(:docid)/(:commentid)'),
    validatePathVariables(schemas.deleteComment),
    deleteComment,
);

exports.handler = async (event, context) => {
    return router.run(event, context);
}