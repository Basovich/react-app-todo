import React from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';
import PropTypes from 'prop-types';


function TodoList (props) {
    const todos = props.todos;
 
    return (
            <ul className="todo-list">
                {todos.map((todo, index) => {
                    return (
                        <TodoItem 
                            key={index} 
                            todo={todo}
                            index={index}
                        />
                    )               
                })}
            </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default TodoList
