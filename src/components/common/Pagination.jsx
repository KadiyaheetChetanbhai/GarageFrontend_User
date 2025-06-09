import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({ paginationData, onPageChange }) {
  if (!paginationData) return null;

  const { total, page, limit, totalPages, nextPage, previousPage } =
    paginationData;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const getPageNumbers = () => {
    let pageNumbers = [];

    if (totalPages <= 1) {
      return [1];
    }

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        pageNumbers = [1, 2, 3, 4, "...", totalPages];
      } else if (page >= totalPages - 2) {
        pageNumbers = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pageNumbers = [1, "...", page - 1, page, page + 1, "...", totalPages];
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-6">
      {/* Previous button */}
      <button
        type="button"
        className={`flex items-center justify-center p-2 rounded-lg cursor-pointer text-white ${
          previousPage === null ? "bg-primary-dark/60 " : "bg-primary-dark"
        }`}
        onClick={() => handlePageChange(page - 1)}
        aria-label="Previous page"
        disabled={previousPage === null}
      >
        <ArrowLeft size={24} />
      </button>

      {/* Page numbers */}
      <div className="flex gap-3">
        {pageNumbers.map((pageNum, index) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${pageNum}`}
              className={`font-semibold w-10 h-10 rounded-lg cursor-pointer ${
                page === pageNum
                  ? "bg-[#FBA55F66]"
                  : "hover:bg-gray-200 border border-primary-grey/20"
              }`}
              onClick={() => handlePageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={page === pageNum ? "page" : undefined}
              type="button"
            >
              {pageNum}
            </button>
          )
        )}
      </div>

      {/* Next button */}
      <button
        type="button"
        className={`flex items-center justify-center p-2 rounded-lg cursor-pointer text-white ${
          nextPage === null ? "bg-primary-dark/60" : "bg-primary-dark"
        }`}
        onClick={() => handlePageChange(page + 1)}
        aria-label="Next page"
        disabled={nextPage === null}
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
}
