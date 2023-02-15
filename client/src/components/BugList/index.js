import React from 'react';
import Bug from './Bug';

const BugList = ({ bugs, title }) => {
  if (!bugs.length) {
    return <h3>No Bugs Yet</h3>;
  }

  console.log('BUGS', bugs);

  return (
    <>
      <h4 className="card-header bg-dark text-light p-2 m-0"> {title}
      </h4>
      {bugs && bugs.map(bug => <Bug key={bug._id} {...bug} />)}
    </>
  );
};





export default BugList;
