import { Button } from "react-bootstrap";

export const BookPagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="book-pagination d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
            <Button
                className="book-page-btn"
                onClick={() => onPageChange((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
            >
                Previous
            </Button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Button
                    key={page}
                    className={`book-page-btn ${currentPage === page ? "is-active" : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

            <Button
                className="book-page-btn"
                onClick={() => onPageChange((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    );
};
