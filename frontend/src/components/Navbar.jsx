import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <span 
          className="navbar-brand d-flex align-items-center fw-bold" 
          role="button" 
          onClick={() => setActiveTab('home')}
        >
          <i className="bi bi-people-fill me-2 fs-4 text-primary"></i>
          <span>EmployeeHub</span>
        </span>

        <div className="navbar-nav ms-auto flex-row">
          <button
            className={`btn btn-link nav-link px-3 ${activeTab === 'home' ? 'active text-white' : 'text-white-50'}`}
            onClick={() => setActiveTab('home')}
          >
            <i className="bi bi-house-door me-1"></i> Home
          </button>

          <button
            className={`btn btn-link nav-link px-3 ${activeTab === 'employees' ? 'active text-white' : 'text-white-50'}`}
            onClick={() => setActiveTab('employees')}
          >
            <i className="bi bi-person-lines-fill me-1"></i> Employees
          </button>

          <button
            className={`btn btn-link nav-link px-3 ${activeTab === 'about' ? 'active text-white' : 'text-white-50'}`}
            onClick={() => setActiveTab('about')}
          >
            <i className="bi bi-info-circle me-1"></i> About
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
