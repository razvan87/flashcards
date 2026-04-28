type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  
  export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
  }: Props) {
    if (totalPages <= 1) return null;
  
    return (
      <div>
        {currentPage > 1 && (
          <button onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        )}
  
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
  
        {currentPage < totalPages && (
          <button onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    );
  }