export const validate = (title, project, description, priority, isNewTodo) => {

	return function validation() {
		const fields = [title, project, description, priority];
		const fieldsName = ['title', 'project', 'descriptionTextarea', 'priority'];
		let isValid = true;

		fields.forEach( (field, index) => {
			if ( !isValidate(field) ) {
				document.querySelector(`[name="${fieldsName[index]}"]`).classList.add('input-error');
				isValid = false;
			}
		})

		return isValid;
	}

	function isValidate(name) {
		const value = isNewTodo ? !name.value.trim() : !name.trim();
		if ( value ) {
			return false;
		}
		else if ( name.value === 'default' ) {
			return false;
		}

		return true;
	}
}