import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    return (
      <div className='container w-100'>
        <header className='d-flex flex-wrap justify-content-space-between  align-items-center py-3 mb-4 border-bottom'>
          <a className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'>
            <img src="/assets/pngaaa.com-134584(1).png" alt="Logo - Mantis Logo@seekpng.com" width={300}></img>
          </a>
          <ul className='nav nav-pills'>
            <li className='nav-item'>
              <Link to="/me" className='nav-link'>
                <h1>Profile</h1>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/projects" className='nav-link'>
                <h1>Projects</h1>
              </Link>
            </li>
            <li className='nav-item'>
              <button className=' w-40 btn btn-lg btn-primary'
                onClick={logout}>
                Logout
              </button>
            </li>
          </ul>

        </header>
      </div>
    );
  }
  // If logged out show login controls
  return (
    <>
      <div className='container w-100'>
        <header className='d-flex flex-wrap justify-content-space-between  align-items-center py-3 mb-4 border-bottom'>
          <a className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'>
            <img src="/assets/pngaaa.com-134584(1).png" alt="Logo - Mantis Logo@seekpng.com" width={300}></img>
          </a>
          <ul className='nav nav-pills'>
            <li className='nav-item'>
              <Link to="/login" className='nav-link'>
                <h1>Profile</h1>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/login" className='nav-link'>
                <h1>Projects</h1>
              </Link>
            </li>
            <li className='nav-item'>
            <Link to="/login" className='nav-link'>
              <h1>Login</h1>
            </Link>
            </li>
          </ul>
        </header>
      </div>
    </>
  )
}

export default Navbar
