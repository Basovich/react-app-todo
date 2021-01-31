import React, { useContext } from 'react';
import './TodoItem.scss'
import TodoContext from '../../contextTodo'


function TodoItem({ todo, id }) {
    const { dispatch, openChangeForm, openAddForm } = useContext(TodoContext);

    const text = {
        isHidden: 'Показати опис',
        isVisible: 'Приховати опис',
    }

    function toggleDescription(e) {
        const _this = e.currentTarget;
        const todo = _this.closest('.todo');
        const description = todo.querySelector('.todo__description');
        description.classList.toggle('is-visible');
        _this.textContent = description.classList.contains('is-visible') ? text.isVisible : text.isHidden;
    }

    return (        
        <li className="todo"> 
            <p className="todo__title">{todo.title}</p>  
            <div className="todo__info">
                <p className="todo__project">
                    <b>Проект: </b> 
                    <span className="todo__project-name">{todo.project}</span>
                </p>
                <p className="todo__priority">
                    <b>Пріорітет: </b> 
                    <span className="todo__priority-number">{todo.priority}</span>
                </p>
            </div>
            <div className="todo__description">
                <b className="todo__description-title">Опис:</b>
                <p className="todo__description-text">{todo.description}</p>                
            </div>
            <div className="todo__button-group">
                <button className="todo__button todo__button-change" 
                    type="button"
                    onClick={ () => {
                        openAddForm(false);
                        openChangeForm(id);
                    }}>
                    Змінити завдання
                </button>

                <button className="todo__button todo__button--more" 
                    type="button" 
                    onClick={toggleDescription}>
                    Показати опис
                </button>

                <button className="todo__button todo__button--error" 
                    type="button"
                    onClick={() => {
                        openChangeForm(false);
                        dispatch({
                            type: 'remove',
                            payload: id
                        })
                    }}>
                    Видалити завдання
                </button>
            </div>
        </li>
    )
}

export default TodoItem