import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import api from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const resp = await api.get('/tasks');
      setTodoList(resp.data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const addTask = async () => {
    try {
      const resp = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });

      if (resp.status === 200) {
        console.log('Create Success');
        setTodoValue('');
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Container>
      <Row className='add-item-row'>
        <Col xs={12} sm={10}>
          <input
            type='text'
            placeholder='할일을 입력하세요'
            className='input-box'
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className='button-add' onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} getTasks={getTasks} />
    </Container>
  );
}

export default App;
