import React,{ useContext, useState } from 'react'
import { useTodosDispatch, useTodosValues } from '../../Context/context';
import { v4 as uuidv4 } from 'uuid';
import { FaListCheck } from "react-icons/fa6";

import "./addtask.scss";
import ThemeContextTodo from '../../Context/theme/ThemeContext';

export default function AddTodo() {
  const { dispatch } = useTodosDispatch();
  const [inputValue, setInputValue] = useState("");
  const { taskToEdit, editTaskId, setTaskToEdit,  setEditTaskId } = useTodosValues();
  const { title } = useContext(ThemeContextTodo);
  
// set input Change
const handleInputChange = (e) => {
      setInputValue(e.target.value);
}
// Add Task
const handleAddTask = (e) => {
      e.preventDefault();
      
      if(inputValue.trim() === ''){
         return;
      }
      const newTask = {
        id: uuidv4(),
        title: inputValue,
        completed: false
      }
   
        dispatch({type: 'ADD_TASK', payload: newTask});
        setInputValue('');
}
// Update Task
const handleUpdateTask = (e) => {
      e.preventDefault();

      if (inputValue.trim() === '') {
        return;
      }
  
      const updatedTask = {
        id: editTaskId,
        title: inputValue,
        completed: false
      };
      console.log(editTaskId)
      dispatch({type: "EDIT_TASK", payload: updatedTask})
      setEditTaskId(null); 
      setTaskToEdit(""); 
      setInputValue(""); 
      
}
  return (
    <form onSubmit={editTaskId ? handleUpdateTask : handleAddTask}>
        <div className='list'><FaListCheck style={title}/></div>
        <input
            type="text"
            className="add-task"
            id="add"
            placeholder="Add your todo"
            autoFocus
            value={inputValue || taskToEdit}
            onChange={handleInputChange}
          />
        <button id='btn'>
             {editTaskId ? 'Update' : 'Add'}
        </button>
    </form>
  )
}
