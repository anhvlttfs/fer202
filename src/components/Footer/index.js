import { Container, Row, Col, Nav } from 'react-bootstrap';
import './index.css';

export const Footer = () => {
    return (
        <div className="footer-wrapper">
            <Container className="footer-container p-5">
                <Row className="gy-4">

                    {/* Brand & Tagline Column */}
                    <Col lg={4} md={12}>
                        <div className="d-flex align-items-center mb-3">
                            <div className="footer-logo me-3">
                                <span>B</span>
                            </div>
                            <div>
                                <span className="footer-brand-title d-block">Booker</span>
                                <span className="footer-brand-subtitle d-block">Read more, worry less</span>
                            </div>
                        </div>
                        <p className="footer-text text-muted mb-0">
                            Curating hand-picked stories, practical guides, and timeless classics for curious minds.
                        </p>
                    </Col>

                    {/* Navigation Column 1 */}
                    <Col lg={2} md={4} sm={6} xs={6}>
                        <h5 className="footer-heading mb-3">Explore</h5>
                        <Nav className="flex-column footer-links">
                            <Nav.Link href="#discover">Discover</Nav.Link>
                            <Nav.Link href="#library">Library</Nav.Link>
                            <Nav.Link href="#authors">Authors</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Navigation Column 2 */}
                    <Col lg={2} md={4} sm={6} xs={6}>
                        <h5 className="footer-heading mb-3">Company</h5>
                        <Nav className="flex-column footer-links">
                            <Nav.Link href="#about">About Us</Nav.Link>
                            <Nav.Link href="#careers">Careers</Nav.Link>
                            <Nav.Link href="#blog">Journal</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Connection / Community Column */}
                    <Col lg={4} md={4} sm={12}>
                        <h5 className="footer-heading mb-3">Community</h5>
                        <p className="footer-text text-muted mb-3">
                            Join our growing network of over 18k+ active readers.
                        </p>
                        <div className="footer-socials d-flex gap-3">
                            <a href="#twitter" className="social-link">Twitter</a>
                            <a href="#instagram" className="social-link">Instagram</a>
                            <a href="#threads" className="social-link">Threads</a>
                        </div>
                    </Col>
                </Row>

                <hr className="footer-divider my-4" />

                {/* Bottom Bar */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <span className="copyright-text">
                        &copy; {new Date().getFullYear()} Booker. All rights reserved.
                    </span>
                    <div className="footer-legal-links d-flex gap-4">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>

            </Container>
        </div>
    );
};
