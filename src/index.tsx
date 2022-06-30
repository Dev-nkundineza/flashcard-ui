import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import CssBaseline from "@material-ui/core/CssBaseline";
import './index.css';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import store from '../src/redux/store';


const httpLink = createHttpLink({
  uri: 'https://flashcardbackend-api.herokuapp.com/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('auth-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
  <ApolloProvider client={client}>
  <CssBaseline/>
  <App />  
  </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);

