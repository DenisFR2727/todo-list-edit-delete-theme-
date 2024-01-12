import React, { useContext } from 'react'
import { useTodosDispatch, useTodosValues } from '../../Context/context'
import ThemeContextTodo from '../../Context/theme/ThemeContext';

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Filter from '../Filter/Filter';

import "./todolist.scss";
 
export default function TodoList() {
  const { dispatch } = useTodosDispatch();
  const { todos, setTaskToEdit, setEditTaskId, filteredTask } = useTodosValues();
  const { toggleTheme, deleteBtn } = useContext(ThemeContextTodo);

  const handleTaskCheckboxChange = (taskId) => {
        dispatch({type: "COMLETED_UNCOMPLETED", payload: taskId})
  }

  // Edit Task
  const  handleEditTask = (id) => {
        setEditTaskId(id);

        const taskToEdit = todos.find((task) => task.id === id);
        setTaskToEdit(taskToEdit.title);
        console.log(taskToEdit)
  }
  // Delete Task
  const handleDeleteTask = (id) => {
        dispatch({type: "DELETE_TASK", payload: id})
  }
  // Filter Task All Completed Uncompleted
  const filterTasks = () => {
    return todos.filter((filter) => {
      if (filteredTask === 'all') return true;
      else if (filteredTask === 'completed') return filter.completed;
      else if (filteredTask === 'uncompleted') return !filter.completed;
      return true;
    })
  }
  return (
    <div>
        <ul className='list'>
        {filterTasks().map((task) => ( 
                <li key={task.id}>
                  <input type="checkbox"
                         id={`task-${task.id}`}
                         data-id={task.id}
                         className='custom-checkbox'
                         checked={task.completed}
                         onChange={() => handleTaskCheckboxChange(task.id)}
                  />
                  <label htmlFor={`task-${task.id}`}
                         style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</label>
                  <div>
                      <FaRegEdit  
                         className='edit'
                         onClick={() => handleEditTask(task.id)}/>
                      <MdDeleteForever 
                         className='delete'
                         style={deleteBtn}
                         onClick={() => handleDeleteTask(task.id)}/>
                  </div>
                </li>
        ))}
        </ul>
        <div className='filter-total-completed'>
             <Filter/>
             <div className="completed-task">
             <p>
                Completed: 
                <span>{todos.filter((task) => task.completed).length}</span>
             </p>
            </div>   
            <div className="remaining-task">
            <p>
              <span id="total-tasks">
                Total Tasks: 
               <span id="tasks-counter">{todos.length}</span>
              </span>
            </p>
          </div>
        </div>
        <div className='theme-btn'>
               <button onClick={toggleTheme}  
               >Theme on</button>
        </div>
    </div>
  )
}
