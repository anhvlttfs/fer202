import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import './index.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth || {});

    React.useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    }, [auth.user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
            navigate('/');
        } catch (err) {
            alert("Login failed. Try again");
        }
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

                                {auth.error && <div className="text-danger mb-2">{auth.error}</div>}
                                <div className="d-grid">
                                    <Button type="submit" className="btn-login rounded-pill px-4 py-2" disabled={auth.status === 'loading'}>
                                        {auth.status === 'loading' ? 'Signing in...' : 'Log in'}
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