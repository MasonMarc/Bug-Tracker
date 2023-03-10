import React from 'react';
import { Link } from 'react-router-dom';

const Project = ({ _id, name }) => {
  return (
    <div key={_id} className="card p-3">
      <h4>
        <Link to={`/project/${_id}`}>
          {name}
        </Link>
      </h4>
    </div>
  );
};


const ProjectList = ({ projects, title }) => {
  if (!projects.length) {
    return <h3>No Projects Yet</h3>;
  }

  const renderProjects = () => {
    if (!projects) return null;
    return projects.map(project => <Project key={project._id} {...project} />);
  }
  return (
    <main className='form-signin w-100 m-auto text-center p-5'>
      <h4 className="card-header bg-dark text-light p-2 m-0"> {title}
      </h4>
      {renderProjects()}
    </main>

  );
};





export default ProjectList;
