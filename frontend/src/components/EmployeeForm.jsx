import React, { useState, useEffect } from 'react';

const DEPARTMENTS = ['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations'];

function EmployeeForm({ onSubmit, editingEmployee, onCancelEdit }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dept: '',
    email: '',
    salary: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        id: editingEmployee.id,
        name: editingEmployee.name,
        dept: editingEmployee.dept,
        email: editingEmployee.email,
        salary: editingEmployee.salary
      });
      setErrors({});
    } else {
      resetForm();
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.id && formData.id !== 0) {
      newErrors.id = 'Employee ID is required.';
    } else if (isNaN(Number(formData.id)) || Number(formData.id) <= 0) {
      newErrors.id = 'Employee ID must be a positive number.';
    }

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Employee Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.dept || !formData.dept.trim()) {
      newErrors.dept = 'Please select a department.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g., name@example.com).';
    }

    if (formData.salary === '' || formData.salary === null || formData.salary === undefined) {
      newErrors.salary = 'Salary is required.';
    } else if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      id: Number(formData.id),
      name: formData.name.trim(),
      dept: formData.dept.trim(),
      email: formData.email.trim(),
      salary: Number(formData.salary)
    };

    onSubmit(payload, Boolean(editingEmployee));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      dept: '',
      email: '',
      salary: ''
    });
    setErrors({});
  };

  const handleResetOrCancel = () => {
    resetForm();
    if (editingEmployee && onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="card custom-card shadow-sm mb-4">
      <div className={`card-header text-white ${editingEmployee ? 'bg-warning text-dark' : 'bg-primary'}`}>
        <h5 className="card-title mb-0 d-flex align-items-center">
          <i className={`bi ${editingEmployee ? 'bi-pencil-square' : 'bi-person-plus-fill'} me-2`}></i>
          {editingEmployee ? `Update Employee (ID: ${editingEmployee.id})` : 'Add New Employee'}
        </h5>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-2">
              <label htmlFor="emp-id" className="form-label fw-semibold">
                ID <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="emp-id"
                name="id"
                className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                placeholder="e.g. 1"
                value={formData.id}
                onChange={handleChange}
                disabled={Boolean(editingEmployee)}
              />
              {errors.id && <div className="invalid-feedback">{errors.id}</div>}
              {editingEmployee && <small className="text-muted">ID cannot be changed</small>}
            </div>

            <div className="col-md-3">
              <label htmlFor="emp-name" className="form-label fw-semibold">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="emp-name"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="e.g. Abhinav Singh"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="col-md-2">
              <label htmlFor="emp-dept" className="form-label fw-semibold">
                Department <span className="text-danger">*</span>
              </label>
              <select
                id="emp-dept"
                name="dept"
                className={`form-select ${errors.dept ? 'is-invalid' : ''}`}
                value={formData.dept}
                onChange={handleChange}
              >
                <option value="">Select Dept</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.dept && <div className="invalid-feedback">{errors.dept}</div>}
            </div>

            <div className="col-md-3">
              <label htmlFor="emp-email" className="form-label fw-semibold">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="emp-email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="e.g. abhinavsingh280803@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="col-md-2">
              <label htmlFor="emp-salary" className="form-label fw-semibold">
                Salary (₹) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="emp-salary"
                name="salary"
                className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                placeholder="e.g. 60000"
                value={formData.salary}
                onChange={handleChange}
              />
              {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            {editingEmployee ? (
              <button type="submit" className="btn btn-warning fw-semibold px-4">
                <i className="bi bi-check-circle me-1"></i> Update Employee
              </button>
            ) : (
              <button type="submit" className="btn btn-primary fw-semibold px-4">
                <i className="bi bi-plus-circle me-1"></i> Add Employee
              </button>
            )}

            <button
              type="button"
              className="btn btn-outline-secondary px-3"
              onClick={handleResetOrCancel}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> {editingEmployee ? 'Cancel' : 'Reset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
