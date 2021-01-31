import React, {useContext} from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';
import TodoContext from "../../contextTodo";


export default function TodoList () {
    let {state, filterPriority, filterProject} = useContext(TodoContext);

    let filteredTodos = filter(state.slice(), filterPriority, filterProject);

    function filter(cloneTodos, priority, project) {
        let todos = cloneTodos;

        // 1. Filter Priority
        function sortByPriority(arr) {
            arr.sort((a, b) => +a.priority > +b.priority ? 1 : -1);
        }

        priority
            ? sortByPriority(todos)
            : todos = cloneTodos;

        // 2. Filter Project Name
        if ( project !== 'default' ) {
            todos = todos.filter(todo => todo.project === project);
        }

        return todos;
    }


    return (
            <ul className="todo-list">
                {
                    filteredTodos.length
                    ? filteredTodos.map(todo => {
                        return (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                id={todo.id}
                            />
                        )
                    })
                    : <li>Перелік завдань порожній</li>
                }
            </ul>
    )
}