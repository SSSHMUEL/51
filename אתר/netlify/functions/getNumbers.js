const faunadb = require('faunadb');
const q = faunadb.query;
const jwt = require('jsonwebtoken');

const FAUNA_SECRET = process.env.FAUNA_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

const client = new faunadb.Client({ secret: FAUNA_SECRET });

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
};

const getUserIdFromAuthHeader = (event) => {
    const authHeader = event.headers.authorization;
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    return decoded ? decoded.userId : null;
};

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    
    const userId = getUserIdFromAuthHeader(event);
    if (!userId) {
        return { statusCode: 401, body: JSON.stringify({ message: 'לא מאושר.' }) };
    }

    try {
        const user = await client.query(q.Get(q.Ref(q.Collection('users'), userId)));

        return {
            statusCode: 200,
            body: JSON.stringify({ numbers: user.data.numbers || [] }),
        };

    } catch (error) {
        console.error('Get Numbers Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'שגיאה בשליפת המספרים.', error: error.message }),
        };
    }
};