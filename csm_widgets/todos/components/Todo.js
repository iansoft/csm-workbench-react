import React, {PropTypes } from 'react';

const Todo = ({onClick, completed, text}) => (
     <li
        onClick={onClick}
        style={{
          textDecoration: completed ? 'line-through' : 'none',
          cursor: completed ? 'default' : 'pointer'
        }}>
        {text}
      </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};

export default Todo