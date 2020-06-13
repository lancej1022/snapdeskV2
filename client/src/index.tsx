import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

import './styles/index.scss';
import store from './app/store';
import theme from './styles/theme';
import Login from './views/login';
import App from './App';
import PrivateRoute from './utils/PrivateRoute';
import { getAccessToken, setAccessToken } from './accessToken';

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          // this operation attempts to make sure we have the proper header
          // certain operations will NOT work unless a bearer token is present in the header
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) return true;

        try {
          // the decoded token has an expiration property named 'exp', so we destructure that
          const { exp } = jwtDecode(token);
          // if the current time is greater than the expiration, token must be expired
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch (err) {
          // token is invalid
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch('http://localhost:4000/refresh_token', {
          method: 'POST',
          credentials: 'include',
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },

      handleError: (err) => {
        // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(err);
      },
    }) as any,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      }
      if (networkError) {
        console.log(networkError);
      }
    }),
    requestLink,
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include',
    }),
  ]),
  cache,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <PrivateRoute isLoggedIn={true} path="/home">
                <App isLoggedIn={true} />
              </PrivateRoute>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
