import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Header = () => {
  return (
    <header className='w-100'>
      <div className="w-100">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
