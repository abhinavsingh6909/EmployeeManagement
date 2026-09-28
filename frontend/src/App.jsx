import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';
import SearchFilter from './components/SearchFilter.jsx';
import EmployeeTable from './components/EmployeeTable.jsx';
import DeleteModal from './components/DeleteModal.jsx';
import Pagination from './components/Pagination.jsx';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from './api.js';

const PAGE_SIZE = 5;

function App() {
  const [activeTab, setActiveTab] = useState('employees');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      showAlert(
        error.response?.data?.message || 'Could not connect to backend server. Make sure the backend is running.',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSaveEmployee = async (formData, isEditing) => {
    try {
      if (isEditing) {
        const response = await updateEmployee(formData.id, formData);
        setEmployees(prev =>
          prev.map(emp => (Number(emp.id) === Number(formData.id) ? response.data.employee : emp))
        );
        setEditingEmployee(null);
        showAlert(response.data.message || 'Employee updated successfully.', 'success');
      } else {
        const response = await addEmployee(formData);
        setEmployees(prev => [...prev, response.data.employee]);
        showAlert(response.data.message || 'Employee added successfully.', 'success');
      }
    } catch (error) {
      console.error('Error saving employee:', error);
      const errMsg = error.response?.data?.message || 'Failed to save employee. Please try again.';
      showAlert(errMsg, 'danger');
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      const response = await deleteEmployee(id);
      setEmployees(prev => prev.filter(emp => Number(emp.id) !== Number(id)));

      if (editingEmployee && Number(editingEmployee.id) === Number(id)) {
        setEditingEmployee(null);
      }

      setEmployeeToDelete(null);
      showAlert(response.data.message || 'Employee deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting employee:', error);
      const errMsg = error.response?.data?.message || 'Failed to delete employee.';
      showAlert(errMsg, 'danger');
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesName = emp.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const matchesDept = selectedDept === 'All' || emp.dept.toLowerCase() === selectedDept.toLowerCase();
    const empSalary = Number(emp.salary);
    const matchesMin = minSalary === '' || empSalary >= Number(minSalary);
    const matchesMax = maxSalary === '' || empSalary <= Number(maxSalary);

    return matchesName && matchesDept && matchesMin && matchesMax;
  });

  const defaultDepts = ['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Operations'];
  const dynamicDepts = Array.from(new Set([...defaultDepts, ...employees.map(e => e.dept)]));

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('All');
    setMinSalary('');
    setMaxSalary('');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + PAGE_SIZE);

  const avgSalary = employees.length > 0
    ? employees.reduce((sum, emp) => sum + Number(emp.salary), 0) / employees.length
    : 0;

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow-1">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            totalEmployees={employees.length}
            departmentsCount={dynamicDepts.length}
            avgSalary={avgSalary}
          />
        )}

        {activeTab === 'about' && <About />}

        {activeTab === 'employees' && (
          <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold text-dark mb-0">
                  <i className="bi bi-people-fill text-primary me-2"></i> Employee Management
                </h2>
              </div>
            </div>

            {alert && (
              <div
                className={`alert alert-${alert.type} alert-dismissible fade show shadow-sm d-flex align-items-center justify-content-between`}
                role="alert"
              >
                <div>
                  <i className={`bi ${alert.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2 fs-5`}></i>
                  <strong>{alert.message}</strong>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAlert(null)}
                  aria-label="Close"
                ></button>
              </div>
            )}

            <EmployeeForm
              onSubmit={handleSaveEmployee}
              editingEmployee={editingEmployee}
              onCancelEdit={() => setEditingEmployee(null)}
            />

            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
              minSalary={minSalary}
              setMinSalary={setMinSalary}
              maxSalary={maxSalary}
              setMaxSalary={setMaxSalary}
              availableDepartments={dynamicDepts}
              onResetFilters={handleResetFilters}
            />

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading employees...</span>
                </div>
                <p className="mt-2 text-muted">Loading employee data...</p>
              </div>
            ) : (
              <>
                <EmployeeTable
                  employees={paginatedEmployees}
                  onEdit={(emp) => {
                    setEditingEmployee(emp);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  onDeleteClick={(emp) => setEmployeeToDelete(emp)}
                />

                {filteredEmployees.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                    totalItems={filteredEmployees.length}
                  />
                )}
              </>
            )}

            <DeleteModal
              employee={employeeToDelete}
              onConfirm={handleConfirmDelete}
              onCancel={() => setEmployeeToDelete(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
