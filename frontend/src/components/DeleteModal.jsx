import React from 'react';

function DeleteModal({ employee, onConfirm, onCancel }) {
  if (!employee) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '450px', width: '90%' }}>
        <div className="modal-content shadow-lg border-0 rounded-3">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i> Confirm Deletion
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4 text-center">
            <i className="bi bi-person-x text-danger display-4 mb-3 d-block"></i>
            <h6 className="fw-bold mb-2">Are you sure you want to delete this employee?</h6>
            <div className="p-3 bg-light rounded text-start my-3 border">
              <p className="mb-1"><strong>ID:</strong> #{employee.id}</p>
              <p className="mb-1"><strong>Name:</strong> {employee.name}</p>
              <p className="mb-1"><strong>Department:</strong> {employee.dept}</p>
              <p className="mb-0"><strong>Email:</strong> {employee.email}</p>
            </div>
            <p className="text-muted small mb-0">This action cannot be undone.</p>
          </div>

          <div className="modal-footer bg-light justify-content-center">
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger px-4 fw-semibold"
              onClick={() => onConfirm(employee.id)}
            >
              <i className="bi bi-trash-fill me-1"></i> Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
