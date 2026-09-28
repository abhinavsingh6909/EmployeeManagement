import React from 'react';

function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedDept,
  setSelectedDept,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  availableDepartments,
  onResetFilters
}) {
  const isFiltered = searchTerm !== '' || selectedDept !== 'All' || minSalary !== '' || maxSalary !== '';

  return (
    <div className="card custom-card shadow-sm mb-4">
      <div className="card-header bg-secondary text-white py-2 d-flex justify-content-between align-items-center">
        <span className="fw-semibold">
          <i className="bi bi-funnel-fill me-2"></i> Search & Filter Employees
        </span>
        {isFiltered && (
          <button
            className="btn btn-sm btn-outline-light py-0 px-2"
            onClick={onResetFilters}
            title="Reset all filters"
          >
            <i className="bi bi-x-circle me-1"></i> Clear Filters
          </button>
        )}
      </div>

      <div className="card-body p-3">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label htmlFor="search-name" className="form-label small fw-semibold text-muted mb-1">
              Search by Name
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                id="search-name"
                className="form-control"
                placeholder="Type name (e.g. Abhi...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="filter-dept" className="form-label small fw-semibold text-muted mb-1">
              Department
            </label>
            <select
              id="filter-dept"
              className="form-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              {availableDepartments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label htmlFor="filter-min-sal" className="form-label small fw-semibold text-muted mb-1">
              Min Salary (₹)
            </label>
            <input
              type="number"
              id="filter-min-sal"
              className="form-control"
              placeholder="e.g. 50000"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="filter-max-sal" className="form-label small fw-semibold text-muted mb-1">
              Max Salary (₹)
            </label>
            <input
              type="number"
              id="filter-max-sal"
              className="form-control"
              placeholder="e.g. 80000"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
            />
          </div>

          <div className="col-md-1 d-grid">
            <button
              className="btn btn-outline-secondary"
              onClick={onResetFilters}
              disabled={!isFiltered}
              title="Reset all search/filter criteria"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
