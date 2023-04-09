# ExpressJS- GraphQL API with Nosql (MongoDB) Database

### Additional tools included
- bcrypt
- express-graphql
- grapgql
- JsonWebToken 

This is a Simple Express and GraphQL API. It consists of:
* 2 Mutations fields
 - "SignUp" 
 - "SignIn

 * 1 Query field
 - "getAllUsers"

 ## Getting Started
 - Clone the Repository to your Local Machine
 - Install all dependencies with  `npm install`
 - create a `.env` file
 ```javaSript
    PORT=3000
    MONGO_URI= mongodb://localhost:27017/yourdatabase { or to save to cloud, you can create a collection on MongoDB atlas}
    JWT_SECRET= <create your secret code e.g weffjxxk123kdsds>
    JWT_LIFETIME = 1h (JWT life span before expiration)
```
- Start the server with `npm start`

## API Endpoint 
`http://localhost:3000/graphql`
This endpoint is used to execute 
- GraphQL queries(GET) ;& 
- Mutations [POST, UPDATE, DELETE, PATCH/PUT]

## Mongoose Schema 
- `first_name`
- `last_name`
- `email`
- `phone_number`
- `password`

##GraphQL Schema 
- UserType
    - `first_name`
        - `last_name`
        - `email`
        - `phone_number`
        - `password`

- Query
    -`getAllUsers`

-Mutation
    -`signUp`
    -`signIn` 

## Trying out the Using GraphiQl InterFace
* Query -> `getAllUsers`
```javascript
        query{
      getAllUsers{
        first_name,
        last_name,
        email,
        phone_number
      }
    }
```

* Mutation -> `SignUp` SAMPLE
```javascript
        mutation{
  SignUp(first_name: "James", last_name: "Konte", email: "jaK@xyz.com", phone_number:" 08026554262", password:"133226567"){
    first_name
    last_name
    email
    phone_number
    Password
  }
}
``` 


* Mutation -> `SignIn` SAMPLE
```javascript
      mutation{
      SignIn(email:"jaK@xyz.com",password:"133226567")
    }
``` 
