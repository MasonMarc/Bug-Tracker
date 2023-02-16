// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import { QUERY_PROJECTS } from '../utils/queries';
// Components
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';

const Projects = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

  
  return (
    <main>
      <div className="flex-row justify-center w-100">
        <div
          className="col-lg-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ProjectForm />
        </div>

        <div className="col-12 col-md-10 my-3 w-100">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectList
              projects={projects}
              title="projects currently active..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

// add functionality for project id: page to display all bugs with that project id and bug add form

export default Projects;
