import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

export const TopBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});
  const isSignedIn = Boolean(auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="topbar-wrapper">
      <Navbar className="custom-topbar px-4 py-2" expand="md">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          {/* Brand / Logo Section */}
          <Navbar.Brand href="/" className="d-flex align-items-center m-0">
            <div className="brand-logo me-3">
              <span>B</span>
            </div>
            <div className="brand-text">
              <span className="brand-title d-block">Booker</span>
              <span className="brand-subtitle d-block">
                Read more, worry less
              </span>
            </div>
          </Navbar.Brand>

          {/* Navigation Links */}
          <Nav className="nav-links-container mx-auto">
            <Nav.Link href="/" className="nav-btn me-2">
              Home
            </Nav.Link>
            <Nav.Link href="/book" className="nav-btn me-2">
              Library
            </Nav.Link>
            {auth.user?.role === "admin" && (
              <Nav.Link as={Link} to="/admin" className="nav-btn me-2">
                Admin
              </Nav.Link>
            )}
            <Nav.Link href="/stat" className="nav-btn me-2">
              Stat
            </Nav.Link>
          </Nav>

          {/* Action Button */}
          <div className="action-container">
            {isSignedIn ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-black fw-semibold">
                  {auth.user?.email}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="sign-in-btn rounded-pill px-4 py-2"
                >
                  Log out
                </Button>
              </div>
            ) : (
              <Button
                as={Link}
                to={"/login"}
                className="sign-in-btn rounded-pill px-4 py-2"
              >
                Sign in
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};
