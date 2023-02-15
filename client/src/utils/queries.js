import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($term: String!) {
    searchUsers(term: $term) {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
        projects {
        name
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query projects {
    projects {
      _id
      name
      user {
        _id
      }
      bugs {
        _id
      }
    }
  }
`;

export const QUERY_ONE_PROJECT = gql`
  query oneProject {
    _id
    name
    user {
      _id
      name
    }
    bugs {
      _id
      name
      description
    }
  }
`;

export const QUERY_BUGS = gql`
  query projectBugs($id: ID!) {
    projectBugs(id: $id) {
      _id
      name
      description
      createdAt
    }
  }
`;