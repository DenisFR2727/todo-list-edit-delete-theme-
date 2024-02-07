import React, { useCallback, useContext, useState } from 'react';
import { useTodosDispatch, useTodosValues } from '../../Context/context';
import { v4 as uuidv4 } from 'uuid';
import { FaListCheck } from 'react-icons/fa6';

import './addtask.scss';
import ThemeContextTodo from '../../Context/theme/ThemeContext';

const isEmptySpacesAfterTrim = (value) => {
    if (value.trim() === '') {
        return;
    }
};

// HOC
const withAddAndUpdate = (BaseComponent) => {
    return () => {
        const { dispatch } = useTodosDispatch();
        const [inputValue, setInputValue] = useState('');
        const { taskToEdit, editTaskId, setTaskToEdit, setEditTaskId } =
            useTodosValues();
        const { title } = useContext(ThemeContextTodo);

        // set input Change
        const handleInputChange = useCallback((e) => {
            setInputValue(e.target.value);
        }, []);
        // Add Task
        const handleAddTask = useCallback(
            (e) => {
                e.preventDefault();

                isEmptySpacesAfterTrim(inputValue);

                const newTask = {
                    id: uuidv4(),
                    title: inputValue,
                    completed: false,
                };
                dispatch({ type: 'ADD_TASK', payload: newTask });
                setInputValue('');
            },
            [dispatch, inputValue]
        );
        // Update Task
        const handleUpdateTask = useCallback(
            (e) => {
                e.preventDefault();

                isEmptySpacesAfterTrim(inputValue);

                const updatedTask = {
                    id: editTaskId,
                    title: inputValue,
                    completed: false,
                };
                dispatch({ type: 'EDIT_TASK', payload: updatedTask });
                setEditTaskId(null);
                setTaskToEdit('');
                setInputValue('');
            },
            [inputValue, editTaskId, dispatch, setEditTaskId, setTaskToEdit]
        );
        return (
            <BaseComponent
                // {...props}
                handleInputChange={handleInputChange}
                inputValue={inputValue}
                taskToEdit={taskToEdit}
                handleUpdateTask={handleUpdateTask}
                title={title}
                handleAddTask={handleAddTask}
                editTaskId={editTaskId}
            />
        );
    };
};
function AddTodo(props) {
    const {
        editTaskId,
        handleAddTask,
        handleUpdateTask,
        title,
        inputValue,
        taskToEdit,
        handleInputChange,
    } = props;
    return (
        <form onSubmit={editTaskId ? handleUpdateTask : handleAddTask}>
            <div className="list">
                <FaListCheck style={title} />
            </div>
            <input
                type="text"
                className="add-task"
                id="add"
                placeholder="Add your todo"
                autoFocus
                value={inputValue || taskToEdit}
                onChange={handleInputChange}
            />
            <button id="btn">{editTaskId ? 'Update' : 'Add'}</button>
        </form>
    );
}
const AddTodoWithUpdate = withAddAndUpdate(AddTodo);

export default function AddUpdateComponent() {
    return (
        <>
            <AddTodoWithUpdate />
        </>
    );
}
