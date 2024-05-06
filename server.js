const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mysql = require('mysql2/promise');

// Создаем соединение с базой данных
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'lab11', // Название вашей базы данных
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Определяем схему GraphQL
const typeDefs = gql`
  type User {
    id: Int
    name: String
    email: String
    password: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
  }
`;

// Определяем резольверы
const resolvers = {
  Query: {
    users: async () => {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    }
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
      const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      return user[0];
    }
  }
};

// Создаем экземпляр сервера Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Создаем экземпляр Express
const app = express();

// Запускаем сервер Apollo и применяем к нему middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

// Запускаем сервер
app.listen({ port: 4000 }, () => {
  console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
});
