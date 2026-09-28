import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange, totalItems }) {
  const safeTotalPages = Math.max(totalPages, 1);

  const pageNumbers = [];
  for (let i = 1; i <= safeTotalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 my-3">
      <div className="text-muted fw-semibold">
        Page <span className="text-dark">{currentPage}</span> of{' '}
        <span className="text-dark">{safeTotalPages}</span>{' '}
        <span className="badge bg-secondary ms-2">{totalItems} Total Records</span>
      </div>

      <nav aria-label="Employee table pagination">
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <i className="bi bi-chevron-left me-1"></i> Previous
            </button>
          </li>

          {pageNumbers.map((num) => (
            <li
              key={num}
              className={`page-item ${currentPage === num ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(num)}
              >
                {num}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage >= safeTotalPages || totalPages === 0 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= safeTotalPages || totalPages === 0}
              aria-label="Next Page"
            >
              Next <i className="bi bi-chevron-right ms-1"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
