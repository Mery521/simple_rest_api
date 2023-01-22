const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID
    firstname: String!
    lastname: String!
    email: String!
    token: String
  }
  type Workspace {
    id: ID!
    name: String!
    uniqueSlag: String!
    userId: User!
  }
  type Channel {
    id: ID!
    name: String!
    workspaceId: Workspace!
    userId: User!
  }
  type Query {
    users: [User!]
    getWorkspaceById(id:ID): Workspace!
    getChannelById(id:ID): Channel!
  }
  type Mutation {
    signup(
      firstname: String!
      lastname: String!
      password: String!
      email: String!
    ): User!
    login(email: String, password: String): User!
    creteWorkspace(id: ID, name: String, uniqueSlag: String, userId: ID): Workspace!
    updateWorkspace(workspaceId: ID!, name: String, uniqueSlag: String, userId: ID): Workspace!
    deleteWorkspace(id:ID!): Workspace!
    creteChannel(id: ID, name: String, workspaceId: ID, userId: ID): Channel!
    updateChannel(channelId: ID!, name: String, workspaceId: ID, userId: ID): Channel!
    deleteChannel(id:ID!): Channel!
  }
`;