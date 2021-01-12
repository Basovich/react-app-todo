import React, { useState, useContext, useEffect } from 'react';
import './TodoChange.scss'
import Context from '../../context'
import PropTypes from 'prop-types';


function TodoChange(props) {
    const { openChangeForm } = useContext(Context);
    const { dispatch } = useContext(Context);

    
    const [title, setTitle] = useState(props.todo.title);
    const [project, setProject] = useState(props.todo.project);
    const [description, setDescription] = useState(props.todo.description);
    const [priority, setPriority] = useState(props.todo.priority);

    useEffect(() => {
        setTitle(props.todo.title);
        setProject(props.todo.project);
        setDescription(props.todo.description);
        setPriority(props.todo.priority);
    }, [props]);

    return (       
        <>
            <h2>Змінити завдання</h2>
            <form className="todo-change-wrap">
                <label className="pure-material-textfield-outlined">
                    <input placeholder=" " 
                        value={title} 
                        onChange={event => setTitle(event.currentTarget.value)} 
                    />
                    <span>Назва завдання</span>
                </label>
                <label className="pure-material-textfield-outlined">
                    <input placeholder=" "
                        value={project}
                        onChange={event => setProject(event.target.value)}
                    />
                    <span>Назва проекту</span>
                </label>

                <label className="pure-material-textfield-outlined">
                    <textarea placeholder=" " 
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <span>Опис проекту</span>
                </label>
                <div className="select">
                    <select className="select-text"
                        value={priority}
                        onChange={event => setPriority(event.target.value)}>
                        <option value="default" disabled>Оберіть пріорітет</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="todo__button-group todo__button-group--right mt-20">
                    <button className="todo__button todo__button-change"
                        type="button"
                        onClick={() => {
                            dispatch({
                                type: 'change',
                                payload: {
                                    title,
                                    project,
                                    description,
                                    priority,
                                    id: props.todo.id                                    
                                }
                            });
                        }}>
                        Зберегти
                    </button>
                    <button className="todo__button todo__button--error"
                        type="button" 
                        onClick={ () => {
                            openChangeForm(false);
                        }}>
                        Відмінити
                    </button>
                </div>
            </form>
        </>           
    )
}

TodoChange.propTypes = {
    todo: PropTypes.object.isRequired  
}


export default TodoChange