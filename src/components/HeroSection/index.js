import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
    const [topBook, setTopBook] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/books").then(res => res.json()).then(jsonData => setTopBook(jsonData[0]));
    }, []);

    return (
        <div className="hero-wrapper">
            <Container className="hero-container p-5">
                <Row className="align-items-center g-5">

                    {/* Left Column: Content & Call to Action */}
                    <Col lg={7} md={12} className="hero-content">
                        <span className="hero-tag d-block mb-3">
                            Curated for curious minds
                        </span>
                        <h1 className="hero-title mb-3">
                            Discover your next favorite book in minutes.
                        </h1>
                        <p className="hero-description mb-4">
                            Build a reading ritual around hand-picked stories, practical guides, and timeless classics.
                        </p>

                        {/* Action Buttons */}
                        <div className="hero-buttons mb-5 d-flex gap-3 flex-wrap">
                            <Button className="btn-explore rounded-pill px-4 py-2" as={Link} to={"/book"}>
                                Explore library
                            </Button>
                        </div>
                    </Col>

                    {/* Right Column: Featured Card */}
                    <Col lg={5} md={12}>
                        <div className="featured-card p-4 p-md-5 d-flex flex-column justify-content-between">
                            <div>
                                <span className="featured-tag d-block mb-3">
                                    Featured this week
                                </span>
                                <h2 className="featured-title mb-2">
                                    {topBook?.title}
                                </h2>
                                <p className="featured-author mb-0">
                                    {topBook?.author}
                                </p>
                                <Button className="btn-view-picks rounded-pill px-4 py-2 mt-3" as={Link} to={`/book/${topBook?.id}`}>
                                    Read book
                                </Button>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};
