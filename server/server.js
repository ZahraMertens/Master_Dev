if(process.env.NODE_ENV !== "production"){
    require("dotenv").config() //or load()
}

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
});

// STRIPE
// Stripe uses an id which they send back to the server when creating a request so no credit
// card details get stored in the application to protect sensetive information

 
