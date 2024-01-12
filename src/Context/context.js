import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { fetchTodos } from "../api/fetch";

// Create Context
const TodosContext = createContext();
const TodosDispatchContext = createContext();

const initialState = JSON.parse(localStorage.getItem('todos') || '[]' )

// Reducer
function todosReducer(todos, action){
        switch(action.type){
             case "TODOS":
               const uniqueTodos = action.payload.reduce((acc, currTask) => {
                  const existingTask = acc.find(task => task.id === currTask.id);
                  if (!existingTask) {
                    acc.push(currTask);
                  }
                  return acc;
                }, [...initialState]);
          
                return uniqueTodos;
             case "ADD_TASK":
               return [...todos, action.payload];

             case "DELETE_TASK":
                return  todos.filter((task) => task.id  !== action.payload);
             case "EDIT_TASK": 
                const updatedTaskIndex = todos.findIndex((task) => task.id === action.payload.id);
                const updatedTodos = [...todos];
                      updatedTodos[updatedTaskIndex] = action.payload;
                return updatedTodos;
             case "COMLETED_UNCOMPLETED":
                return todos.map((task) => task.id === action.payload ? {...task, completed: !task.completed} : task);
             case "COMPLETE_ALL_TASKS":
                return todos.map((task) => task && {...task, completed: true});
             case "DELETE_COMPLETE_TASKS":
                return todos.filter((task) => !task.completed);

                default: return todos;
        }
}

export function StateProvider ({children}) {
       const [todos, dispatch] = useReducer(todosReducer , []);
       const [taskToEdit, setTaskToEdit] = useState("");
       const [editTaskId, setEditTaskId] = useState(null); 
       const [filteredTask, setFilteredTask] = useState('all');

    useEffect(() => {
    const fetchingTodos = async () => {
        const data = await fetchTodos()

        dispatch({type: "TODOS", payload: data})
    }
    fetchingTodos();
    },[]);
  
   // save task to localStorage
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
  
       return (
            <TodosContext.Provider value={ 
                {todos, setTaskToEdit, taskToEdit,
                 editTaskId, setEditTaskId, filteredTask, setFilteredTask 
                } }>
                <TodosDispatchContext.Provider value={ {dispatch} }>
                         {children}
                </TodosDispatchContext.Provider>
            </TodosContext.Provider>
       )
}
export function useTodosValues() {
    return useContext(TodosContext);
}
export function useTodosDispatch() {
    return useContext(TodosDispatchContext);
};