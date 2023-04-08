const mongoose =require("mongoose");
const CONFIG = require("./env.config")

const connectDB = () => {
    return mongoose.connect(CONFIG.mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
module.exports = connectDB;