import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './index.css';

export const TrendingSection = () => {
    const trendingBooks = [
        {
            id: 1,
            title: 'The Midnight Library',
            author: 'Matt Haig',
            description: 'A hopeful and intimate story about every life we could have lived.'
        },
        {
            id: 2,
            title: 'Sapiens',
            author: 'Yuval Noah Harari',
            description: 'A sweeping account of how humans got here and why we thrive.'
        },
        {
            id: 3,
            title: 'Atomic Habits',
            author: 'James Clear',
            description: 'Tiny changes with remarkable results for your daily routine.'
        }
    ];

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
                        <Button className="btn-see-all px-3 py-1">
                            See all
                        </Button>
                    </div>
                </div>

                {/* Cards Grid */}
                <Row className="g-4">
                    {trendingBooks.map((book) => (
                        <Col key={book.id} lg={4} md={6} xs={12}>
                            <Card className="book-card h-100 p-4 border-0">
                                {/* Visual Placeholder for Book Cover */}
                                <div className="book-cover-placeholder mb-3"></div>

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
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Container>
        </div>
    );
};
