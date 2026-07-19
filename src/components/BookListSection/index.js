import { Col, Row } from "react-bootstrap";
import { BookCard } from "../BookCard";
import { BookPagination } from "../BookPagination";
import { BookStatePanel } from "../BookStatePanel";
import "./index.css";

export const BookListSection = ({ loading, error, filteredBooks, paginatedBooks, currentPage, totalPages, favoriteBooks, onToggleFavorite, onReadBook, onPageChange }) => {
    return (
        <div className="book-list-wrapper">
            <div className="book-list-container container">
                {loading ? (
                    <BookStatePanel>Loading books...</BookStatePanel>
                ) : error ? (
                    <BookStatePanel error>{error}</BookStatePanel>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                            <div>
                                <span className="book-section-tag d-block">Showing results</span>
                                <h2 className="book-section-title m-0">{filteredBooks.length} books found</h2>
                            </div>
                            <div className="book-results-badge">Page {currentPage} of {totalPages}</div>
                        </div>

                        <Row className="g-4">
                            {paginatedBooks.length > 0 ? (
                                paginatedBooks.map((book) => (
                                    <Col key={book.id} lg={6} xl={4} md={6} xs={12}>
                                        <BookCard
                                            book={book}
                                            isFavorite={Boolean(favoriteBooks[book.id])}
                                            onToggleFavorite={onToggleFavorite}
                                            onReadBook={onReadBook}
                                        />
                                    </Col>
                                ))
                            ) : (
                                <Col xs={12}>
                                    <BookStatePanel>No books match the current search and filters.</BookStatePanel>
                                </Col>
                            )}
                        </Row>

                        <BookPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </>
                )}
            </div>
        </div>
    );
};
