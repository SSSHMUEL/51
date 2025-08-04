const bcrypt = require('bcryptjs');
const { client, q, jwt, JWT_SECRET } = require('../utils');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { email, password } = JSON.parse(event.body);
    if (!email || !password) {
        return { statusCode: 400, body: JSON.stringify({ message: 'אימייל וסיסמה נדרשים.' }) };
    }

    try {
        const existingUser = await client.query(
            q.If(
                q.Exists(q.Match(q.Index('users_by_email'), email)),
                q.Get(q.Match(q.Index('users_by_email'), email)),
                null
            )
        );

        if (existingUser) {
            return { statusCode: 409, body: JSON.stringify({ message: 'משתמש עם אימייל זה כבר קיים.' }) };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query(
            q.Create(
                q.Collection('users'),
                { data: { email, password: hashedPassword, numbers: [] } }
            )
        );

        const token = jwt.sign({ userId: newUser.ref.id, email: newUser.data.email }, JWT_SECRET, { expiresIn: '1h' });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'ההרשמה בוצעה בהצלחה!', token, email: newUser.data.email }),
        };

    } catch (error) {
        console.error('Registration Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'שגיאה פנימית בשרת.', error: error.message }),
        };
    }
};