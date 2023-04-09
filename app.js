const express = require("express");
const app = express();
const CONFIG = require("./config/env.config");
const connectDB = require("./config/connectDB")
// const graphql = require("graphql");
const { graphqlHTTP} = require("express-graphql");
const schema = require("./Schemas/index");


app.use(express.json());
// app.use(authenticate)


app.use('/graphql', graphqlHTTP({
    schema: schema,

    graphiql: true // Enables the GraphiQL interface for testing purposes
  }));


// Express server ~ mongoose connections set up
const PORT = CONFIG.port || 3000;
const MONGO_URI = CONFIG.mongo_uri  || "mongodb://localhost:27017/yourdatabase";
const start = async()=>{
    try {
        await connectDB(MONGO_URI);
         app.listen(PORT, () => console.log(`Server running at port:${PORT}`))
    } catch (err) {
        console.log("Unable to connect to the Database" + err)
    }
}
//start up connection
start();
