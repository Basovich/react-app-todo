import React, {useState, useEffect, useReducer} from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoAdd from './components/TodoAdd/TodoAdd';
import TodoChange from './components/TodoChange/TodoChange';
import TodoFilter from './components/TodoFilter/TodoFilter';
import TodoContext from './contextTodo';
import {reducer} from './reducer';

function App() {
	const data = JSON.parse(localStorage.getItem("todos")) || [];
	const [state, dispatch] = useReducer(reducer, data);

	const [changeForm, setChangeForm] = useState(false);
	function openChangeForm(id) {
		// sometimes 0 comes, so need to check for false
		id === false
			? setChangeForm(false)
			: setChangeForm(state[state.findIndex(item => item.id === id)]);
	}

	const [visibleForm, setVisibleForm] = useState(false);
	function openAddForm(visibleForm) {
		setVisibleForm(visibleForm);
	}

	const [filterPriority, setFilterPriority] = useState(false);
	function setNewFilterPriority(bool) {
		setFilterPriority(bool);
	}

	const [filterProject, setFilterProject] = useState('default');
	function setNewFilterProject(project) {
		setFilterProject(project);
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
		<TodoContext.Provider value={
			{
				state,
				dispatch,
				changeForm,
				openChangeForm,
				openAddForm,
				visibleForm,
				filterPriority,
				setNewFilterPriority,
				filterProject,
				setNewFilterProject,
			}
		}>
			<div className='wrapper'>
				<h1>Перелік завдань</h1>
				<TodoList />
				<TodoFilter />
				{changeForm ? <TodoChange /> : null}
				<TodoAdd/>
			</div>
		</TodoContext.Provider>
	);
}

export default App;