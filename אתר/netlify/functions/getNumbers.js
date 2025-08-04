const { client, q, getUserIdFromAuthHeader } = require('../utils');

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