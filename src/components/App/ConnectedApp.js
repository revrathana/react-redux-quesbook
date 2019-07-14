import React, { Component } from "react";
import { connect } from "react-redux";
import "../../favicon.ico";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GQL_URL } from "../../constants/urls";

class ConnectedApp extends Component {
  render() {
    const httpLink = createHttpLink({
      uri: GQL_URL,
    });

    const networkInterface = createNetworkInterface({ uri: `${GQL_URL}` });

    networkInterface.use([
      {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        const token = localStorage.getItem("token");
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
      },
    },
    ]);

    const client = new ApolloClient({
      networkInterface,
      cache: new InMemoryCache(),
    });

    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(ConnectedApp);
