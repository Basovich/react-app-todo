import React, { useContext, useState } from 'react';
import './TodoAdd.scss'
import Context from '../../context'


function TodoAdd() {
    const { dispatch } = useContext(Context);
    const { openChangeForm } = useContext(Context);
    const { openAddForm } = useContext(Context);
    const { visibleForm } = useContext(Context);

    const [todoTitle, setTodoTitle] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('default');


    function toggleAddForm() {
        openAddForm(!visibleForm);
        clearForm();
    }

    function clearForm() {
        setTodoTitle('');
        setProjectTitle('');
        setDescription('');
        setPriority('default');
    }

    function showButton() {
        return (
            <div className="todo__button-group todo__button-group--right mt-20 todo-button-add">
                <button className="todo__button todo__button-change"
                    type="button"
                    onClick={ () => {
                        toggleAddForm();
                        openChangeForm(false);
                    }}>
                    Додати завдання
                </button>
            </div>
        )
    }

    function showForm() {
        return (
            <>
                <h2>Додати нове завдання</h2>
                <form className="todo-add">
                    <label className="pure-material-textfield-outlined">
                        <input placeholder=" "
                            value={todoTitle}
                            onChange={event => setTodoTitle(event.target.value)}
                        />
                        <span>Назва завдання</span>
                    </label>
                    <label className="pure-material-textfield-outlined">
                        <input placeholder=" "
                            value={projectTitle}
                            onChange={event => setProjectTitle(event.target.value)}
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
                                    type: 'add',
                                    payload: {
                                        title: todoTitle,
                                        project: projectTitle,
                                        description: description,
                                        priority: priority
                                    }
                                });

                                clearForm();
                            }}>
                            Зберегти
                    </button>
                        <button className="todo__button todo__button--error"
                            type="button"
                            onClick={toggleAddForm}>
                            Відмінити
                    </button>
                    </div>
                </form>    
            </>            
        )
    }

    return (      
        <div className='todo-add-wrap'>         
            {visibleForm ? showForm() : showButton()}
        </div>
    )
}

export default TodoAdd