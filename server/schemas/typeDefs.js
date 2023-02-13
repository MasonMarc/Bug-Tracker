const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]
  }

  type Project {
    _id: ID
    name: String
    user: [User]
    bugs: [Bug]
  }

  type Bug {
    _id: ID
    name: String
    description: String
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
    addProject(name: String!, user: ID!): Project
    addBug(name: String!, description: String!, project: ID!): Bug
    assignUsertoProject(project: ID!, user: ID!): Project
    editBug(description: String!, bug: ID!): Bug
    deleteBug(bug: ID!): Bug
    deleteProject(project: ID!): Project
  }
`;

module.exports = typeDefs;
