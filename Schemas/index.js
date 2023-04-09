const graphql = require("graphql"); 
const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList 
} =  require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const UserType = require("./TypeDefs/UserType");
const CONFIG = require("../config/env.config");


//QUERY
const RootQueryType = new GraphQLObjectType({
    name:"Query",
    fields:{
        //Query_ to get All authenticated Users
        getAllUsers: {
           type: new GraphQLList(UserType),
            args: { 
                id : {type: GraphQLString},
                first_name: { type : GraphQLString},
                last_name: { type : GraphQLString},
                email: { type : GraphQLString},
                phone_number: { type : GraphQLString}     
            },
            resolve: async(parent, args) => {
                const users= await User.find();
                const userObj = {}
                users.forEach((userDetails, i) =>{
                    userObj[`userID${i}`] = userDetails;
                }
                return userObj;
            }
        },
        //
    }
})


//MUTATION 
const RootMutationType =  new GraphQLObjectType({
    name: "Mutation",
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
            resolve: async(parent, args) => {
                const userAlreadyExists = await User.findOne({email : args.email });
                if(userAlreadyExists){
                    throw new Error(`This email ${args.email} already exists`);
                }

                //encrypt users password with the bcrypt library
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(args.password, salt);

                const user = new User({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    phone_number: args.phone_number,
                    password: hashedPassword
                })

                await user.save();
                return user;
            }
        },

        //@Desc Existing User Login
       SignIn: {
        type: GraphQLString,
        args: {
            email : {type: GraphQLString},
            password: {type: GraphQLString}
        },
        resolve: async( parent, args) =>{
            const user = await User.findOne({email : args.email});

            if(!user){
                throw new Error('Invalid Credentials')
            }

            //validate if user's password matches encrypted password
            const isValidPassword = await bcrypt.compare(args.password, user.password);
            if(!isValidPassword){
                throw new Error("Incorrect password");
            }
            const token = jwt.sign({ 
                _id: user.id, 
                email: user.email 
            },  
            CONFIG.jwt_secret,
            {
                expiresIn : CONFIG.jwt_lifetime || '1h'
            });
        return token;
        }
       }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})



