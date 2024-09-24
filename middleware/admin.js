const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
     try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.adminId = decoded.adminId;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Failed to authenticate token" });
    }
}

module.exports = adminMiddleware; 

