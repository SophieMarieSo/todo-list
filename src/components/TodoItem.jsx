import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const TodoItem = ({ item, deleteItem, toggleComplete }) => {
  return (
    <Row style={{ marginBottom: 4 }}>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? 'item-complete' : ''}`}>
          <div className='todo-content task'>{item.task}</div>
          <div className='todo-content'>by {item.author?.name}</div>
          <div>
            <Button
              className='button-delete'
              onClick={() => deleteItem(item._id)}
            >
              삭제
            </Button>
            <Button
              className='button-delete'
              onClick={() => toggleComplete(item._id)}
            >
              {item.isComplete ? `안끝남` : `끝남`}
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
