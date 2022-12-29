import React from 'react';
import { Link } from 'react-router-dom';

function TodoItem() {
  return (
    <div>
      <Link to="/:id"></Link>
    </div>
  );
}

export default TodoItem;
