import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  name: '',
  email: '',
  password: '',
  reEnterPassword: '',
};

const RegisterPage = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 첫번째 비밀번호와 두번째 비밀번호가 일치하는지 확인
      if (form.password !== form.reEnterPassword) {
        throw new Error('비밀번호가 일치하지 않습니다. 다시 입력해주세요');
      }

      const data = {
        name: form.name,
        password: form.password,
        email: form.email,
      };
      const resp = await api.post('/user', data);
      console.log('====================================');
      console.log(resp);
      console.log('====================================');
      if (resp.status === 200) {
        navigate('/login');
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='display-center'>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form className='login-box' onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='string'
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type='password'
            required
            onChange={(e) =>
              setForm({ ...form, reEnterPassword: e.target.value })
            }
          />
        </Form.Group>

        <Button className='button-primary' type='submit'>
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
