function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return [
                ...state,
                {
                    id: Date.now(),
                    title: action.payload.title,
                    project: action.payload.project,
                    description: action.payload.description,
                    priority: action.payload.priority
                }
            ]
            
        case 'change':        
            let newState = [];
            state.forEach(todo => {
                if (todo.id !== action.payload.id) {
                    newState.push(todo);
                } else {
                    newState.push({
                        id: action.payload.id,
                        title: action.payload.title,
                        project: action.payload.project,
                        description: action.payload.description,
                        priority: action.payload.priority
                    });
                }
            })
            return newState
          
        case 'remove':          
            return state.filter( (todo, i) => action.payload !== i )

        default: 
            return state
    }
}


export {reducer}