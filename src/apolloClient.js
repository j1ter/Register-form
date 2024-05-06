import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Замените на адрес вашего GraphQL сервера
  cache: new InMemoryCache()
});

export default client;
