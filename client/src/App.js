import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
// import { createUploadLink } from "apollo-upload-client"
import { setContext } from '@apollo/client/link/context';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Home from "./pages/Home/index";
import StudentSignup from "./pages/StudentSignup/index";
import TutorSignup from "./pages/TutorSignup";
import SearchResults from "./pages/searchresults/index";
import ProfileSearch from './pages/ProfileSearch/index';
import LoginStudent from './pages/LoginStudent/index';
import LoginTutor from "./pages/LoginTutor/index";
import TutorProfile from './pages/TutorProfile/index';
import StudentProfile from './pages/StudentProfile/index';
import CheckoutPage from "./pages/CheckoutPage/index";
import Success from "./pages/Success/Success"


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql', //Uniform resource identifier
});

// Middelware has access to the headers from request
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
// setContext is a method to retrieve an existing token from the local storage and attaches the token to every request send from the client
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


// When configuring the client, include the middleware function to include the token in the header of the requests
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), //Cache we are going to use
});

//Attach authentication to header of request
function App() {
  return (
    // Use apolloProvider to parse the client to all childs
    // Makes it able to access to the client prop from all child components
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
        <Route exact path="/signup-tutor">
          <TutorSignup />
        </Route>
        <Route exact path="/results/:language">
          <SearchResults />
        </Route>
        <Route exact path="/profile/:tutorId">
          <ProfileSearch />
        </Route>
        <Route exact path="/login-student">
          <LoginStudent />
        </Route>
        <Route exact path="/login-tutor">
          <LoginTutor />
        </Route>
        <Route exact path="/tutorProfile/:tutorId">
          <TutorProfile />
        </Route>
        <Route exact path="/studentProfile/:studentId">
          <StudentProfile />
        </Route>
        <Route exact path="/book/:tutorId">
          <CheckoutPage />
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
      </main>
      <Footer />
    </Router>
  </ApolloProvider>
  );
}

export default App;
