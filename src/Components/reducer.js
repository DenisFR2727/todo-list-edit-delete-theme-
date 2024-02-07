const initialState = JSON.parse(localStorage.getItem('todos') || '[]');

// Reducer
export function todosReducer(todos, action) {
    switch (action.type) {
        case 'TODOS':
            const uniqueTodos = action.payload.reduce(
                (acc, currTask) => {
                    const existingTask = acc.find(
                        (task) => task.id === currTask.id
                    );
                    if (!existingTask) {
                        acc.push(currTask);
                    }
                    return acc;
                },
                [...initialState]
            );

            return uniqueTodos;

        case 'ADD_TASK':
            return [...todos, action.payload];

        case 'DELETE_TASK':
            return todos.filter((task) => task.id !== action.payload);
        case 'EDIT_TASK':
            const updatedTaskIndex = todos.findIndex(
                (task) => task.id === action.payload.id
            );
            const updatedTodos = [...todos];
            updatedTodos[updatedTaskIndex] = action.payload;
            return updatedTodos;
        case 'COMLETED_UNCOMPLETED':
            return todos.map((task) =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );
        case 'COMPLETE_ALL_TASKS':
            return todos.map((task) => task && { ...task, completed: true });
        case 'DELETE_COMPLETE_TASKS':
            return todos.filter((task) => !task.completed);

        default:
            return todos;
    }
}
