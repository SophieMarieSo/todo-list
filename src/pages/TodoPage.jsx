import React, { useEffect, useState } from 'react';
import TodoBoard from '../components/TodoBoard';
import api from '../utils/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TodoPage = ({ user, setUser }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const navigate = useNavigate();

  const getTasks = async () => {
    const response = await api.get('/tasks');
    setTodoList(response.data.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTodo = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });

      if (response.status === 200) {
        getTasks();
      }
      setTodoValue('');
    } catch (error) {
      console.log('error:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <Container>
      <Row className='title'>
        <Col xs={12} sm={10}>
          <h2>{`Welcome ${user.name}`}</h2>
        </Col>
        <Col xs={12} sm={2}>
          <Button onClick={logout} className='button-logout'>
            logout
          </Button>
        </Col>
      </Row>
      <Row className='add-item-row'>
        <Col xs={12} sm={10}>
          <input
            type='text'
            placeholder='할일을 입력하세요'
            onChange={(event) => setTodoValue(event.target.value)}
            className='input-box'
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <Button onClick={addTodo} className='button-add'>
            추가
          </Button>
        </Col>
      </Row>
      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
    </Container>
  );
};

export default TodoPage;
