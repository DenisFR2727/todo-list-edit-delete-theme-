import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { fetchTodos } from '../api/fetch';
import { todosReducer } from '../Components/reducer';
// Create Context
const TodosContext = createContext();
const TodosDispatchContext = createContext();

export function StateProvider({ children }) {
    const [todos, dispatch] = useReducer(todosReducer, []);
    const [taskToEdit, setTaskToEdit] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [filteredTask, setFilteredTask] = useState('all');

    useEffect(() => {
        const fetchingTodos = async () => {
            const data = await fetchTodos();

            dispatch({ type: 'TODOS', payload: data });
        };
        fetchingTodos();
    }, []);

    // save task to localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodosContext.Provider
            value={{
                todos,
                setTaskToEdit,
                taskToEdit,
                editTaskId,
                setEditTaskId,
                filteredTask,
                setFilteredTask,
            }}
        >
            <TodosDispatchContext.Provider value={{ dispatch }}>
                {children}
            </TodosDispatchContext.Provider>
        </TodosContext.Provider>
    );
}
export function useTodosValues() {
    return useContext(TodosContext);
}
export function useTodosDispatch() {
    return useContext(TodosDispatchContext);
}
