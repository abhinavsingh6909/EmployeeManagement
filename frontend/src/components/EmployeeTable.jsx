import React from 'react';

const getDeptBadgeClass = (dept) => {
  switch (dept?.toUpperCase()) {
    case 'HR':
      return 'bg-info text-dark';
    case 'IT':
      return 'bg-primary text-white';
    case 'FINANCE':
      return 'bg-success text-white';
    case 'MARKETING':
      return 'bg-warning text-dark';
    case 'SALES':
      return 'bg-secondary text-white';
    default:
      return 'bg-dark text-white';
  }
};

function EmployeeTable({ employees, onEdit, onDeleteClick }) {
  return (
    <div className="card custom-card shadow-sm mb-4">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-dark">
          <i className="bi bi-table me-2 text-primary"></i> Employee Records
        </h5>
        <span className="badge bg-primary rounded-pill px-3 py-2">
          {employees.length} Showing
        </span>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0 align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col" style={{ width: '80px' }}>ID</th>
                <th scope="col">Name</th>
                <th scope="col">Department</th>
                <th scope="col">Email</th>
                <th scope="col">Salary</th>
                <th scope="col" className="text-center" style={{ width: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    <i className="bi bi-folder-x fs-1 d-block mb-2 text-secondary"></i>
                    <p className="mb-1 fw-semibold">No employees found.</p>
                    <small>Try clearing or adjusting your search & filter criteria.</small>
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="fw-bold text-secondary">#{emp.id}</td>

                    <td className="fw-semibold text-dark">
                      <i className="bi bi-person me-2 text-muted"></i>
                      {emp.name}
                    </td>

                    <td>
                      <span className={`badge ${getDeptBadgeClass(emp.dept)} dept-badge`}>
                        {emp.dept}
                      </span>
                    </td>

                    <td>
                      <a href={`mailto:${emp.email}`} className="text-decoration-none text-muted">
                        <i className="bi bi-envelope me-1"></i> {emp.email}
                      </a>
                    </td>

                    <td className="fw-semibold text-success">
                      ₹{Number(emp.salary).toLocaleString('en-IN')}
                    </td>

                    <td className="text-center">
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(emp)}
                          title="Edit employee"
                        >
                          <i className="bi bi-pencil-fill me-1"></i> Edit
                        </button>

                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDeleteClick(emp)}
                          title="Delete employee"
                        >
                          <i className="bi bi-trash-fill me-1"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
