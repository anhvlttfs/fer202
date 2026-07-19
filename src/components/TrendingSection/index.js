import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import './index.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const TrendingSection = () => {

    const [trendingBooks, setTrendingBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/books").then(res => res.json()).then(jsonData => setTrendingBooks(jsonData?.slice(0, 3)));
    }, [])

    return (
        <div className="trending-wrapper">
            <Container className="trending-container px-0">

                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
                    <div>
                        <span className="trending-tag d-block mb-1">Trending now</span>
                        <h2 className="trending-heading m-0">Freshly picked for your next chapter</h2>
                    </div>
                    <div>
                        <Button className="book-read-btn px-3 py-1" as={Link} to={"/book"}>
                            See all
                        </Button>
                    </div>
                </div>

                {/* Cards Grid */}
                <Row className="g-4">
                    {trendingBooks.map((book) => (
                        <Col key={book.id} lg={4} md={6} xs={12}>
                            <Card className="book-card h-100 p-4 border-0">
                                <Card.Body className="p-0 d-flex flex-column">
                                    <Card.Title className="book-title mb-1">
                                        {book.title}
                                    </Card.Title>
                                    <span className="book-author d-block mb-3">
                                        {book.author}
                                    </span>
                                    <Card.Text className="book-description">
                                        {book.description}
                                    </Card.Text>
                                    <Button as={Link} to={`/book/${book.id}`} className="book-read-btn">
                                        Read book
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Container>
        </div>
    );
};
