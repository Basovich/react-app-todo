import React, {useState, useEffect, useReducer} from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoAdd from './components/TodoAdd/TodoAdd';
import TodoChange from './components/TodoChange/TodoChange';
// import TodoFilter from './components/TodoFilter/TodoFilter';
import TodoContext from './contextTodo';
import {reducer} from './reducer';

function App() {
	const data = JSON.parse(localStorage.getItem("todos")) || [];
	const [state, dispatch] = useReducer(reducer, data);

	const [changeForm, setChangeForm] = useState(false);

	function openChangeForm(index) {
		index === false ? setChangeForm(false) : setChangeForm(state[index]);
	}

	const [visibleForm, setVisibleForm] = useState(false);

	function openAddForm(visibleForm) {
		setVisibleForm(visibleForm);
	}

	useEffect(() => {
		try {
			localStorage.setItem('todos', JSON.stringify(state));
		} catch (error) {
			alert(error);
		}

		setChangeForm(false);
	}, [state]);

	return (
		<TodoContext.Provider value={{dispatch, openChangeForm, openAddForm, visibleForm}}>
			<div className='wrapper'>
				<h1>Перелік завдань</h1>
				<TodoList todos={state}/>
				{/*<TodoFilter todos={state} />  */}
				{changeForm ? <TodoChange todo={changeForm}/> : null}
				<TodoAdd/>
			</div>
		</TodoContext.Provider>
	);
}

export default App;