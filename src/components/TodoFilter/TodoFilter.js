import React from 'react';
import './TodoFilter.scss'


function TodoFilter(props) {
    let projects = [];
    const todos = props.todos;
    todos.forEach(todo => {
        if (todo.project.indexOf() === -1) {
            projects.push(todo.project);
        }     
    });

    return (
        <>
            <h2 className="todo-filter__title">Фільтр:</h2>
            <div className="todo-filter">        
                <label className="pure-material-checkbox">
                    <input type="checkbox" />
                    <span>по пріорітету</span>
                </label>
                <div className="select">
                    <select className="select-text" defaultValue={'default'}>
                        <option value="default" disabled>Всі проекти</option>
                        {projects.map( (project, index) => {
                            return (
                                <option key={index} 
                                        value={project}>
                                    {project}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </>
    )
}

export default TodoFilter