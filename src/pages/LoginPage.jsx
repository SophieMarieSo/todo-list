import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../utils/api';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await api.post('/user/login', { email, password });

      if (resp.status === 200) {
        setUser(resp.data.user);
        sessionStorage.setItem('token', resp.data.token);
        api.defaults.headers['authorization'] = 'Bearer ' + resp.data.token;
        setError('');
        navigate('/');
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <div className='display-center'>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form className='login-box' onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className='button-box'>
          <Button type='submit' className='button-primary'>
            Login
          </Button>
          <span>
            계정이 없다면? <Link to='/register'>회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
