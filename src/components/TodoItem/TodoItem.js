import React, { useContext } from 'react';
import './TodoItem.scss'
import PropTypes from 'prop-types';
import Context from '../../context'


function TodoItem({ todo, index }) {
    const { dispatch } = useContext(Context);
    const { openChangeForm } = useContext(Context);
    const { openAddForm } = useContext(Context);

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
                        openChangeForm(index);
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
                            payload: index
                        })
                    }}>
                    Видалити завдання
                </button>
            </div>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default TodoItem