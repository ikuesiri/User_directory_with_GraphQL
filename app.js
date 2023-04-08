const express = require("express");
const app = express();
const CONFIG = require("./config/env.config");
const connectDB = require("./config/connectDB")
const graphql = require("graphql"); 
const { GraphQLObjectType,GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull} =  require("graphql");
const { graphqlHTTP} = require("express-graphql");

//user Model 
const User = require("./model/user.model");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
         id: { type : GraphQLInt},
         first_name: { type : GraphQLString},
         last_name: { type : GraphQLString},
         email: { type : GraphQLString},
         phone_number: { type : GraphQLString},
         Password: { type : GraphQLString}
    })
})



//QUERY
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        //Query_ to get All authenticated Users
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { 
                first_name: { type : GraphQLString},
                last_name: { type : GraphQLString},
                email: { type : GraphQLString},
                phone_number: { type : GraphQLString}     
            },
            resolve(parent, args){
                return User.find({});
            }
        },
        //
    }
})


//MUTATION

const Mutation =  new GraphQLObjectType({
    name: "MutationType",
    fields: {

        //@Desc Register New User
        SignUp:{
            type: UserType,
            args: {
                first_name: { type: GraphQLString},
                last_name: { type: GraphQLString},
                email: { type: GraphQLString},
                phone_number: { type: GraphQLString},
                password: { type: GraphQLString},

            },

            resolve(parent, args){
                return User.create({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    phone_number: args.phone_number,
                    password: args.password
                })
                // return args;
            }
        },

        //@Desc Existing User Login

       SignIn: {
        type: UserType,
        args: {
            email : {type: GraphQLString},
            password: {type: GraphQLString}
        },
        resolve( parent, args){

            email = args.email;
            return User.findOne({email});
        }
       }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true // Enables the GraphiQL interface for testing purposes
  }));


// Express server ~ mongoose connections set up
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
