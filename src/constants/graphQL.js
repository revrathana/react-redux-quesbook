import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GQL_URL } from './urls';
import { getJwtToken } from './jwtToken';

const httpLink = createHttpLink({
  uri: GQL_URL
})

const networkInterface = createNetworkInterface({uri: `${GQL_URL}`});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = getJwtToken();
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

export const client = new ApolloClient({
  networkInterface,
  cache: new InMemoryCache()
})
