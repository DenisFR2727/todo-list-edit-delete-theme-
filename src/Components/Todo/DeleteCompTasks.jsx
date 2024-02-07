import React from 'react';
import { useTodosDispatch } from '../../Context/context';

export default function DeleteCompTasks() {
    const { dispatch } = useTodosDispatch();

    const deleteCompTasks = () => {
        dispatch({ type: 'DELETE_COMPLETE_TASKS' });
    };
    return (
        <>
            <div className="del-com-all" onClick={deleteCompTasks}>
                <span>Delete comp tasks</span>
            </div>
        </>
    );
}
