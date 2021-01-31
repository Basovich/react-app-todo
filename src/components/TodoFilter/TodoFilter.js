import React, {useContext, useState} from 'react';
import './TodoFilter.scss'
import TodoContext from "../../contextTodo";


function TodoFilter() {
    let {filterPriority, setNewFilterPriority, state, filterProject, setNewFilterProject} = useContext(TodoContext);
    const [checked, setChecked] = useState(filterPriority);
    const [project, setProject] = useState(filterProject);

    let projects = [];
    state.forEach(todo => {
        if (todo.project.indexOf() === -1) {
            projects.push(todo.project);
        }     
    });

    function setFilterPriority(bool) {
        setNewFilterPriority(bool)
        setChecked(bool);
    }

    function setFilterProject(bool) {
        setNewFilterProject(bool)
        setProject(bool);
    }


    return (
        <>
            <h2 className="todo-filter__title">Фільтр:</h2>
            <div className="todo-filter">        
                <label className="pure-material-checkbox">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={event => setFilterPriority(event.target.checked)}
                    />
                    <span>по пріорітету</span>
                </label>
                <div className="select">
                    <select
                        className="select-text"
                        value={project}
                        onChange={event => setFilterProject(event.target.value)}
                    >
                        <option value='default'>Всі проекти</option>
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