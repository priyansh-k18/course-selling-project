require('dotenv').config();

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD || "passwordforadmin";
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD || "passwordforuser";

module.exports = {
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD
};

