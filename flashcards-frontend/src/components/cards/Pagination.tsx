import styles from "./Pagination.module.css";

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
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button 
            className={`${styles.button} ${styles.navButton}`}
            onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        )}
  
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.button} ${currentPage === page ? styles.active : ""}`}
            onClick={() => onPageChange(page)}>
            {page}
          </button>
        ))}
  
        {currentPage < totalPages && (
          <button 
            className={`${styles.button} ${styles.navButton}`}
            onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    );
  }