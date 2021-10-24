import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Home from "./pages/Home/index";
import StudentSignup from "./pages/StudentSignup/index";
import Results from "./pages/SearchResults/index";
import Profile from './pages/Profile';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql', //Uniform resource identifier
});

// Middelware has access to the headers from request
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
  cache: new InMemoryCache(), //Cache we are going to use
});

//Attach authentication to header of request
function App() {
  return (
    // Use apolloProvider to parse the client to all childs
    //Makes it able to access to the client prop from all child components
  <ApolloProvider client={client}>
    <Router>
      <Header />
      <main>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signup-student">
          <StudentSignup />
        </Route>
        <Route exact path="/results/:language">
          <Results />
        </Route>
        <Route exact path="/tutor/:tutorId">
          <Profile />
        </Route>
      </main>
      <Footer />
    </Router>
  </ApolloProvider>
  );
}

export default App;
