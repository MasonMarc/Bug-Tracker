import React from 'react';

export default function Nav({ currentPage, handlePageChange }) {

  return (
    <nav className="navbar navbar-expand-lg bg-secondary text-uppercase static-top" id="mainNav">
    <div className="container">
        <a className="navbar-brand" href="#page-top">Bug Tracker</a>
        <button className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive"
            aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-0 mx-lg-1">
                  <a className={"nav-link py-3 px-0 px-lg-3 rounded"} 
                        href="#about"
                        onClick={() => handlePageChange('About')}
          currentPage = {'About' ? 'nav-link active' : 'nav-link'}
          >About</a></li>
                <li className="nav-item mx-0 mx-lg-1">
                  <a className="nav-link py-3 px-0 px-lg-3 rounded"
                        href="#projects"
                        onClick={() => handlePageChange('Projects')}
          currentPage = {'Projects' ? 'nav-link active' : 'nav-link'}>Projects</a></li>
                <li className="nav-item mx-0 mx-lg-1">
                  <a className="nav-link py-3 px-0 px-lg-3 rounded"
                        href="#contact"
                        onClick={() => handlePageChange('Contact')}
          currentPage = {'Contact' ? 'nav-link active' : 'nav-link'}>Contact</a></li>
                <li className="nav-item mx-0 mx-lg-1">
                  <a className="nav-link py-3 px-0 px-lg-3 rounded"
                        href="#resume"
                        onClick={() => handlePageChange('Resume')}
          currentPage = {'Resume' ? 'nav-link active' : 'nav-link'}>Resume</a></li>
            </ul>
        </div>
    </div>
</nav>
  );
}
