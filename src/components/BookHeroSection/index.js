import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "./index.css";

export const BookHeroSection = ({ bookCount, favoriteCount, genreCount, featuredBook }) => {
    const featuredTitle = featuredBook?.title || "Featured book";
    const featuredAuthor = featuredBook?.author || "Pick a favorite from the collection";
    const featuredGenre = featuredBook?.genre || "Featured pick";
    const featuredDescription = featuredBook?.description || "A highlighted title from the library, ready to catch the reader's eye.";

    return (
        <div className="book-hero-wrapper">
            <Container fluid className="book-hero-container p-4 p-lg-5">
                <Row className="align-items-center g-4">
                    <Col lg={7} md={12}>
                        <span className="book-hero-tag d-block mb-3">Library catalog</span>
                        <h1 className="book-hero-title mb-3">Browse every book in the collection.</h1>
                        <p className="book-hero-description mb-4">
                            Search by title, narrow by genre, and mark favorites with a heart so the best reads stay close at hand.
                        </p>

                        <div className="book-hero-stats d-flex flex-wrap gap-4">
                            <div className="book-stat-item">
                                <span className="book-stat-number d-block">{bookCount}</span>
                                <span className="book-stat-label">Books loaded</span>
                            </div>
                            <div className="book-stat-item">
                                <span className="book-stat-number d-block">{favoriteCount}</span>
                                <span className="book-stat-label">Favorites</span>
                            </div>
                            <div className="book-stat-item">
                                <span className="book-stat-number d-block">{genreCount}</span>
                                <span className="book-stat-label">Genres</span>
                            </div>
                        </div>
                    </Col>

                    <Col lg={5} md={12}>
                        <div className="book-featured-card p-4 p-md-5">
                            <span className="book-featured-tag d-block mb-3">Featured book</span>
                            <h2 className="book-featured-title mb-3">
                                <Link to={`/book/${featuredBook?.id || ""}`} className="book-featured-title-link">
                                    {featuredTitle}
                                </Link>
                            </h2>
                            <p className="book-featured-author mb-3">{featuredAuthor}</p>
                            <div className="book-featured-meta mb-3">{featuredGenre}</div>
                            <p className="book-featured-text mb-0">{featuredDescription}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
