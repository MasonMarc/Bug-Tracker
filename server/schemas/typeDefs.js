const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    project: Project
  }

  type Project {
    _id: ID
    name: String
    user: User
    bugs: [bugs]
  }

  type Bug {
    _id: ID
    name: String
    assignedUser: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(id: ID!): User
    searchUsers(term: String!): [User]!
    me: User
    projects: [Project]!
    bugs: [Bug]!
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
  }
`;

module.exports = typeDefs;
