// Node Modules
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
// Components
import UserList from '../components/UserList';

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Navigate to="/me" replace />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading) return null;
    // Only renders users who's profile we're not currently viewing
    const notMeUsers = users.filter(o => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;
    console.log(user.projects);
    if (error) return <p>Something went wrong</p>;
    if(user.projects[0]){
    return (
      <div className='card w-25 p-5 m-auto'>
        <h3>username: {user.username}</h3>
      <ul className=''>
        <li>email: {user.email}</li>
        <li>projects: {user.projects[0].name}</li>
      </ul>
      </div>
    );
    } 
    return (
      <div className='card w-25 p-5 m-auto'>
        <h3>username: {user.username}</h3>
      <ul className=''>
        <li>email: {user.email}</li>
        <li>No projects yet!</li>
      </ul>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2 className='m-auto p-5 text-center'>
          Viewing {id ? `${user.username}'s` : 'your'} profile.
        </h2>
        {renderCurrentUserInfo()}
      </div>
    </div>
  );
};

export default Profile;
