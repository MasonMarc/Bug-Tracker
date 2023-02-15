import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($name: String!) {
    addProject(name: $name) {
      _id
      name
    }
  }
`;

export const ADD_BUG = gql`
  mutation addBug($projectId: ID!, $name: String!, $description: String) {
    addBug(projectId: $projectId, name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

export const DEL_BUG = gql`
  mutation delBug($name: String!) {
    addBug(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;