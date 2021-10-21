import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home/index";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//Middelware has acces to the headers from request
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  //Get token update request
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Header />
      <main>
        <Route exact path="/">
          <Home />
        </Route>
      </main>
      <Footer />
    </Router>
  </ApolloProvider>
  );
}

export default App;
