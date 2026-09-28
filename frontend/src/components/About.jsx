import React from 'react';

function About() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card custom-card shadow-sm p-4 text-center">
            <div className="d-inline-flex p-3 bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-3">
              <i className="bi bi-briefcase-fill fs-2"></i>
            </div>
            <h3 className="fw-bold text-dark mb-3">About Employee Management System</h3>
            <p className="text-muted mb-3">
              The Employee Management System is a simple, intuitive application designed to help manage organizational workforce records.
            </p>
            <p className="text-muted mb-0">
              It provides tools to add, edit, and delete employee records, search by name, filter by department and salary, and view paginated lists with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
