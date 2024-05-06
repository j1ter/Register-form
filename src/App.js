import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient'; // Подключение к Apollo Client
import RegistrationForm from './RegistrationForm';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Форма регистрации</h1>
        <RegistrationForm />
      </div>
    </ApolloProvider>
  );
};

export default App;
