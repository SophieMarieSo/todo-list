import React from 'react';
import { Col, Row } from 'react-bootstrap';
import api from '../utils/api';

const TodoItem = ({ todo, getTasks }) => {
  const deleteTask = async () => {
    try {
      const resp = await api.delete(`/tasks/${todo._id}`);

      if (resp.status === 200) {
        console.log('Delete Success');
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const completeTask = async () => {
    try {
      await api.put(`/tasks/${todo._id}`, {
        task: todo.task,
        isComplete: !todo.isComplete,
      });
      getTasks();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${todo.isComplete && 'item-complete'}`}>
          <div className='todo-content'>{todo.task}</div>

          <div>
            <button className='button-delete' onClick={deleteTask}>
              삭제
            </button>
            <button className='button-delete' onClick={completeTask}>
              {todo.isComplete ? '안끝남' : '끝남'}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
