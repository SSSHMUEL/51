const faunadb = require('faunadb');
const q = faunadb.query;
const jwt = require('jsonwebtoken');

// חשוב: משתנים אלו צריכים להיות מוגדרים במשתני הסביבה של Netlify!
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

module.exports = {
    client,
    q,
    jwt,
    JWT_SECRET,
    verifyToken,
    getUserIdFromAuthHeader
};