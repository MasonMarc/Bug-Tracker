// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
// Utilities
import { QUERY_BUGS } from '../utils/queries';
// Components
import BugList from '../components/BugList';
import BugForm from '../components/BugForm';

const Project = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_BUGS, {
    variables: { id }
  });
  const bugs = data?.projectBugs || [];

  return (
    <main>
      <div className="flex-row justify-center w-100">
        <div
          className="col-lg-12 col-md-10 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <BugForm />
        </div>

        <div className="col-12 col-md-10 my-3 w-100">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BugList
              bugs={bugs}
              title="bugs currently active..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

// add functionality for project id: page to display all bugs with that project id and bug add form

export default Project;
