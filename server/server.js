require("dotenv").config() //or load()
const mongoose = require("mongoose")
const express = require("express");
const nodemailer = require("nodemailer");
const { ApolloServer } = require('apollo-server-express');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');
const path = require("path");
const cors = require("cors")
//Import middleware to configure with apollo server
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const { typeDefs, resolvers } = require('./schemas');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //Add middleware as contect property so data from authMiddleware can be parsed to the resolver
  context: authMiddleware,
});

server.start().then(res => {
  server.applyMiddleware({ app });
})

// server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/public"));
app.use(cors());
app.use(graphqlUploadExpress());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now listening on localhost: ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});


 
