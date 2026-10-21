function Pagination({ handlePrev, handleNext, pageNo, canGoPrev, canGoNext }) {
  return (
    <div className="bg-gray-400 p-4 mt-8 flex justify-center items-center">
      <button
        type="button"
        className="px-8 disabled:opacity-40"
        onClick={handlePrev}
        disabled={!canGoPrev}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
      </button>
      <span className="font-bold" aria-live="polite">
        {pageNo}
      </span>
      <button
        type="button"
        className="px-8 disabled:opacity-40"
        onClick={handleNext}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        <i className="fa-solid fa-arrow-right-long" aria-hidden="true"></i>
      </button>
    </div>
  )
}

export default Pagination
