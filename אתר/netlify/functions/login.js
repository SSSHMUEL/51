const faunadb = require('faunadb');
const q = faunadb.query;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const FAUNA_SECRET = process.env.FAUNA_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

const client = new faunadb.Client({ secret: FAUNA_SECRET });

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { email, password } = JSON.parse(event.body);
    if (!email || !password) {
        return { statusCode: 400, body: JSON.stringify({ message: 'אימייל וסיסמה נדרשים.' }) };
    }

    try {
        const user = await client.query(q.Get(q.Match(q.Index('users_by_email'), email)));
        
        const isPasswordValid = await bcrypt.compare(password, user.data.password);
        if (!isPasswordValid) {
            return { statusCode: 401, body: JSON.stringify({ message: 'סיסמה שגויה.' }) };
        }

        const token = jwt.sign({ userId: user.ref.id, email: user.data.email }, JWT_SECRET, { expiresIn: '1h' });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'התחברת בהצלחה!', token, email: user.data.email }),
        };

    } catch (error) {
        console.error('Login Error:', error);
        if (error.name === 'NotFound') {
            return { statusCode: 404, body: JSON.stringify({ message: 'משתמש לא נמצא.' }) };
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'שגיאה פנימית בשרת.', error: error.message }),
        };
    }
};