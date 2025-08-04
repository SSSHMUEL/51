const { client, q, getUserIdFromAuthHeader } = require('../utils');

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