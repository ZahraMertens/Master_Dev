require("dotenv").config() //or load()
const mongoose = require("mongoose")
const express = require("express");
const nodemailer = require("nodemailer");
const { ApolloServer } = require('apollo-server-express');
const path = require("path");
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now listening on localhost: ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});


 
