import React, { useState, useContext, useEffect } from 'react';
import './TodoChange.scss'
import TodoContext from '../../contextTodo'
import {validate} from "../TodoAdd/validate";


function TodoChange() {
    const { changeForm, openChangeForm, dispatch } = useContext(TodoContext);

    const [title, setTitle] = useState(changeForm.title);
    const [project, setProject] = useState(changeForm.project);
    const [description, setDescription] = useState(changeForm.description);
    const [priority, setPriority] = useState(changeForm.priority);

    useEffect(() => {
        setTitle(changeForm.title);
        setProject(changeForm.project);
        setDescription(changeForm.description);
        setPriority(changeForm.priority);
    }, [changeForm]);


    function dispatchState() {
        dispatch({
            type: 'change',
            payload: {
                title,
                project,
                description,
                priority,
                id: changeForm.id
            }
        });
    }

    const validator = validate(title, project, description, priority, false);

    function changeTask() {
        if ( !validator() ) return;
        dispatchState();
    }

    return (       
        <>
            <h2>Змінити завдання</h2>
            <form className="todo-change-wrap">
                <label className="pure-material-textfield-outlined">
                    <input placeholder=" " 
                        value={title}
                        name="title"
                        onChange={event => setTitle(event.currentTarget.value)} 
                    />
                    <span>Назва завдання</span>
                </label>
                <label className="pure-material-textfield-outlined">
                    <input placeholder=" "
                        value={project}
                        name="project"
                        onChange={event => setProject(event.target.value)}
                    />
                    <span>Назва проекту</span>
                </label>

                <label className="pure-material-textfield-outlined">
                    <textarea placeholder=" " 
                        value={description}
                        name="descriptionTextarea"
                        onChange={event => setDescription(event.target.value)}
                    />
                    <span>Опис проекту</span>
                </label>
                <div className="select">
                    <select className="select-text"
                        value={priority}
                        name="priority"
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
                        onClick={changeTask}>
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

export default TodoChange