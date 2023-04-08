const express = require("express");
const app = express();
const CONFIG = require("./config/env.config");
const connectDB = require("./config/connectDB")
const {graphql, GraphQLObjectType,GraphQLSchema, GraphQLInt,GraphQLString} =  require("graphql");
// const { graphqlHTTP} = require("express-graphql");






// server ~ mongoose connections set up

const PORT = CONFIG.port || 3000;
const start = async()=>{
    try {
        await connectDB(CONFIG.mongo_uri);
         app.listen(PORT, () => console.log(`Server running at port:${PORT}`))
    } catch (err) {
        console.log("Unable to connect to the Database" + err)
    }
}
//start up connection
start();
