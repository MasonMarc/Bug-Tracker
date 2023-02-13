// Node Modules
import React, { useRef } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, SEARCH_USERS } from '../utils/queries';
// Components
import UserList from '../components/UserList';

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const [searchUsers, { data: searchData }] = useLazyQuery(SEARCH_USERS);
  const users = data?.users || [];
  const searchResults = searchData?.searchUsers || [];
  const inputRef = useRef();

  const renderUserList = () => {
    if (loading) {
      return <h2>Loading...</h2>
    } else {
      return <UserList users={users} title="List of Users" />
    }
  }

  const renderUsername = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getProfile().data.username;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await searchUsers({
      variables: {
        term: inputRef.current.value
      }
    });
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input
          type="text"
          ref={inputRef}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <UserList
          users={searchResults}
          title="Search Results"
        />
      </div>
      <div>
        {renderUsername()}
      </div>
      <div>
        {renderUserList()}
      </div>
    </main>
  );
};

export default Home;
