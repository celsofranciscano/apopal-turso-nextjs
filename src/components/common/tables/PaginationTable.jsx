"use client";

function PaginationTable({ currentPage, totalPages, handlePageChange }) {
  return (
    <div className="flex items-center justify-between mt-4 space-x-2">
      <div className="mb-4">
        <span className="text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
      </div>

      <div className="flex items-center bg-zinc-200 rounded-md text-xs py-2 px-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-black ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-white text-black"
                : "text-zinc-400"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-black ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PaginationTable;
