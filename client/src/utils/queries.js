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
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query projects {
    projects {
      _id
      name
      user{
      _id
      }
      bugs{
      _id
      }
    }
  }
`;

export const QUERY_BUGS = gql`
  query bugs {
    bugs {
      _id
      name
      description
      assignedUser
      project
    }
  }
`;