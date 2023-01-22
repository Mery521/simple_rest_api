const express = require("express");
const sequelize = require('sequelize');
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/user");
const PORT = process.env.PORT || 3000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server.listen(PORT, () => console.log(`Server is connected on ${PORT}`));