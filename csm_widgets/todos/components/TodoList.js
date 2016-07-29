import React, {PropTypes } from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick}) => (
    <ul>
        {todos.map((todo, index) =>
          <Todo 
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)} />
        )}
    </ul>
)

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}

export default TodoList