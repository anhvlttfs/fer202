
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

import './index.css';

export const TopBar = () => {
    return (
        <div className="topbar-wrapper">
            <Navbar className="custom-topbar px-4 py-2" expand="md">
                <Container fluid className="d-flex align-items-center justify-content-between">

                    {/* Brand / Logo Section */}
                    <Navbar.Brand href="/" className="d-flex align-items-center m-0">
                        <div className="brand-logo me-3">
                            <span>B</span>
                        </div>
                        <div className="brand-text">
                            <span className="brand-title d-block">Booker</span>
                            <span className="brand-subtitle d-block">Read more, worry less</span>
                        </div>
                    </Navbar.Brand>

                    {/* Navigation Links */}
                    <Nav className="nav-links-container mx-auto">
                        <Nav.Link href="/book" className="nav-btn me-2">Library</Nav.Link>
                    </Nav>

                    {/* Action Button */}
                    <div className="action-container">
                        <Button className="sign-in-btn rounded-pill px-4 py-2">
                            Sign in
                        </Button>
                    </div>

                </Container>
            </Navbar>
        </div>
    );
};
