if(process.env.NODE_ENV !== "production"){
    require("dotenv").config() //or load()
}

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require('./schemas');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(res => {
  server.applyMiddleware({ app });
})

// server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now listening on localhost: ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// STRIPE
// Stripe uses an id which they send back to the server when creating a request so no credit
// card details get stored in the application to protect sensetive information

 
