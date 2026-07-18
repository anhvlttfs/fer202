import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './index.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt submitted');
    };

    return (
        <div className="login-wrapper">
            <Container className="p-4 p-md-5">
                <Row className="justify-content-center align-items-center">
                    <Col md={8} lg={6}>
                        <div className="login-card p-4">
                            <h2 className="login-title mb-3">Welcome back</h2>
                            <p className="login-subtitle mb-4">Sign in to continue to Booker</p>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" hasValidation>
                                    <Form.Label className="form-label">Email</Form.Label>
                                    <Form.Control type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
                                    <Form.Control.Feedback type="invalid">Enter a password</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" hasValidation>
                                    <Form.Label className="form-label">Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
                                    <Form.Control.Feedback type="invalid">Enter a password</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button type="submit" className="btn-login rounded-pill px-4 py-2">
                                        Log in
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;