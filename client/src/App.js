import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home/index";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

const client = new ApolloClient({
  uri: '/graphql',
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
