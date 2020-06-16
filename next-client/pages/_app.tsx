import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { ApolloProvider } from 'react-apollo';
import { withApollo } from '../lib/apollo';

import theme from '../styles/theme';
import '../styles/global.scss';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
