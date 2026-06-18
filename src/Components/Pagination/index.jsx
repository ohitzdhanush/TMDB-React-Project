import './index.scss';

const Pagination = ({ handleNext, handlePrev, currentPage }) => {
  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </button>

      <span>{currentPage}</span>

      <button onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;