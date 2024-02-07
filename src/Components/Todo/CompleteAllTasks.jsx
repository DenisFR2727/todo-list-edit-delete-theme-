import React from 'react';
import { LuListChecks } from 'react-icons/lu';
import { useTodosDispatch } from '../../Context/context';

export default function CompleteAllTasks() {
    const { dispatch } = useTodosDispatch();

    const completeTasks = () => {
        dispatch({ type: 'COMPLETE_ALL_TASKS' });
    };
    return (
        <div className="com-all" onClick={completeTasks}>
            <div>
                <LuListChecks /> <span>Complete all tasks</span>
            </div>
        </div>
    );
}
