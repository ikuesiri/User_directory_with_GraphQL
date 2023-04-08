require("dotenv").config();

const CONFIG = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET,
    jwt_lifetime: process.env.JWT_LIFETIME
}

module.exports = CONFIG;