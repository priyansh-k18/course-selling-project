const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');

function userMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(403).json({ message: "You are not signed in" });
    }
}

module.exports = userMiddleware;
