import React from 'react';

function Home({ setActiveTab, totalEmployees, departmentsCount, avgSalary }) {
  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-white rounded-3 shadow-sm border text-center">
        <div className="container-fluid py-3">
          <div className="d-inline-flex p-3 bg-primary bg-opacity-10 text-primary rounded-circle mb-3">
            <i className="bi bi-briefcase-fill fs-1"></i>
          </div>
          <h1 className="display-5 fw-bold text-dark">Employee Management System</h1>
          <p className="col-md-8 mx-auto fs-5 text-muted mt-3">
            Manage employee records efficiently with CRUD operations, search, filtering and pagination.
          </p>
          <div className="mt-4">
            <button
              className="btn btn-primary btn-lg px-4 gap-3 shadow-sm"
              onClick={() => setActiveTab('employees')}
            >
              <i className="bi bi-person-lines-fill me-2"></i> View Employees
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4 text-center">
        <div className="col-md-4">
          <div className="card custom-card p-4 border-0 shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-people text-primary fs-1 mb-2"></i>
              <h5 className="card-title text-muted">Total Employees</h5>
              <p className="display-6 fw-bold text-dark mb-0">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card custom-card p-4 border-0 shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-building text-success fs-1 mb-2"></i>
              <h5 className="card-title text-muted">Departments</h5>
              <p className="display-6 fw-bold text-dark mb-0">{departmentsCount}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card custom-card p-4 border-0 shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-currency-rupee text-warning fs-1 mb-2"></i>
              <h5 className="card-title text-muted">Average Salary</h5>
              <p className="display-6 fw-bold text-dark mb-0">₹{Math.round(avgSalary).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
