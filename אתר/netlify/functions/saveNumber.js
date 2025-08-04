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
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    
    const userId = getUserIdFromAuthHeader(event);
    if (!userId) {
        return { statusCode: 401, body: JSON.stringify({ message: 'לא מאושר.' }) };
    }

    const { number } = JSON.parse(event.body);
    if (typeof number !== 'number') {
        return { statusCode: 400, body: JSON.stringify({ message: 'מספר חוקי נדרש.' }) };
    }

    try {
        const user = await client.query(q.Get(q.Ref(q.Collection('users'), userId)));
        const updatedNumbers = [...user.data.numbers, number];

        await client.query(
            q.Update(user.ref, { data: { numbers: updatedNumbers } })
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'המספר נשמר בהצלחה.' }),
        };

    } catch (error) {
        console.error('Save Number Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'שגיאה בשמירת המספר.', error: error.message }),
        };
    }
};