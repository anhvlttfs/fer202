import { Badge, Button, Card } from "react-bootstrap";
import "./index.css";

export const BookCard = ({ book, isFavorite, onToggleFavorite, onReadBook }) => {
    return (
        <Card className="book-card h-100 border-0">
            <div className="book-cover-shell">
                <button
                    type="button"
                    className={`book-favorite-btn ${isFavorite ? "is-favorite" : ""}`}
                    onClick={() => onToggleFavorite(book.id)}
                    aria-label={isFavorite ? "Remove from favorites" : "Mark as favorite"}
                >
                    {isFavorite ? "♥" : "♡"}
                </button>
                <div className="book-cover-frame">
                    <img
                        src={book.image ? `/${book.image}` : "/images/placeholder-book.jpg"}
                        alt={book.title ? `${book.title} cover` : "Book cover"}
                        className="book-cover-image"
                    />
                </div>
            </div>

            <Card.Body className="d-flex flex-column">
                <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                    <div>
                        <Card.Title className="book-title mb-1">{book.title || "Untitled book"}</Card.Title>
                        <Card.Subtitle className="book-author">{book.author || "Unknown author"}</Card.Subtitle>
                    </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mb-3">
                    {book.genre ? (
                        <Badge bg="secondary" className="book-genre-badge">
                            {book.genre}
                        </Badge>
                    ) : null}
                    {book.year ? (
                        <Badge bg="light" text="dark" className="book-year-badge">
                            {book.year}
                        </Badge>
                    ) : null}
                </div>

                <Card.Text className="book-description mb-0">
                    {book.description || "No description available for this book yet."}
                </Card.Text>

                <div className="book-card-actions mt-3">
                    <Button type="button" onClick={() => onReadBook(book.id)} className="book-read-btn">
                        Read book
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
