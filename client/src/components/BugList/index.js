import React from 'react';
import Bug from './Bug';

const BugList = ({ bugs, title }) => {
  if (!bugs.length) {
    return <h3 className='m-auto text-center'>No Bugs Yet!</h3>;
  }

  console.log('BUGS', bugs);

  return (
    <main className='form-signin w-100 m-auto text-center p-5'>
      <h4 className="card-header bg-dark text-light p-2 m-0"> {title}
      </h4>
      {bugs && bugs.map(bug => <Bug key={bug._id} {...bug} />)}
    </main>
  );
};





export default BugList;
