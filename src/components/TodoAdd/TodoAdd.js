import React, {useContext, useState} from 'react';
import './TodoAdd.scss'
import TodoContext from '../../contextTodo'
import {validate} from "./validate";

// обьявляем кастомный хук для всех инпутов,
// хук не уменьшил на много код,
// но я попробовал сам сделать хук + одно действие контролириуем в одном месте
function useInputValue(defaultValue) {
    const [value, setValue] = useState(defaultValue);

    const onChange = event => {
        setValue(event.target.value);
    }

    const onClick = event => {
        event.target.classList.remove('input-error');
    }

    const clear = (val) => setValue(val);

    return {
        bind: {value, onChange, onClick},
        value,
        clear
    }
}


function TodoAdd() {
    const { dispatch, openChangeForm, openAddForm , visibleForm} = useContext(TodoContext);

    const title = useInputValue('');
    const project = useInputValue('');
    const description = useInputValue('');
    const priority = useInputValue('default');

    function toggleAddForm() {
        openAddForm(!visibleForm);
        clearForm();
    }

    function clearForm() {
        title.clear('');
        project.clear('');
        description.clear('');
        priority.clear('default');
    }

    function dispatchState() {
        dispatch({
            type: 'add',
            payload: {
                title: title.value,
                project: project.value,
                description: description.value,
                priority: priority.value
            }
        });
    }

    const validator = validate(title, project, description, priority, true);

    function addTask() {
        if ( !validator() ) return;
        dispatchState();
        clearForm();
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
                        <input
                            placeholder=" "
                            name="title"
                            value={title.bind.value}
                            onChange={title.bind.onChange}
                            onClick={title.bind.onClick}
                        />
                        <span>Назва завдання</span>
                    </label>
                    <label className="pure-material-textfield-outlined">
                        <input
                            placeholder=" "
                            name="project"
                            value={project.bind.value}
                            onChange={project.bind.onChange}
                            onClick={title.bind.onClick}
                        />
                        <span>Назва проекту</span>
                    </label>

                    <label className="pure-material-textfield-outlined">
                        <textarea
                            placeholder=" "
                            name="descriptionTextarea"
                            value={description.bind.value}
                            onChange={description.bind.onChange}
                            onClick={title.bind.onClick}
                        />
                        <span>Опис проекту</span>
                    </label>
                    <div className="select">
                        <select
                            className="select-text"
                            name="priority"
                            value={priority.bind.value}
                            onChange={priority.bind.onChange}
                            onClick={title.bind.onClick}
                        >
                            <option value="default" disabled>Оберіть пріорітет</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="todo__button-group todo__button-group--right mt-20">
                        <button className="todo__button todo__button-change"
                            type="button"
                            onClick={addTask}>
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