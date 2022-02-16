import {
    createRouter,
    RouterType,
    Matcher
} from 'lambda-micro';
import { AWSClients, generateID } from '../common';

//Utilize the DynamoDB Document Client
const dynamoDB = AWSClients.dynamoDB();
const tableName = process.env.DYNAMO_DB_TABLE;

const getAllCommentsForDocument = async (request, response) => {

}

const createComment = async (request, response) => {

}

const deleteComment = async (request, response) => {

}

const router = createRouter(RouterType.HTTP_API_V2);

router.add(
    Matcher.HttpApiV2('GET', '/comments/(:docid)'),
    getAllCommentsForDocument,
);

router.add(
    Matcher.HttpApiV2('GET', '/comments/(:docid)'),
    createComment,
);

router.add(
    Matcher.HttpApiV2('GET', '/comments/(:docid)/(:commentid)'),
    deleteComment,
);

exports.handler = async (event, context) => {
    return router.run(event, context);
}