import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Header = () => {
  return (
    <header>
      {/* <div>
        <Link to="/me">
          <h1>Profile</h1>
        </Link>
      </div>
      <div>
        <Link to="/projects">
          <h1>Projects</h1>
        </Link>
      </div> */}
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
