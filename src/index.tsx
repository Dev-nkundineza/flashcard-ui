import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CssBaseline from "@material-ui/core/CssBaseline";
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'https://flashcardbackend-api.herokuapp.com/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
  <CssBaseline/>
  <App />  
  </ApolloProvider>,
  document.getElementById('root'),
);

