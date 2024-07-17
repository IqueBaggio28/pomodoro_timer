import React, { useState } from 'react';
import './listItem.css';

function ListItem({ taskList, setTaskList }) {
    const [completedTasks, setCompletedTasks] = useState(new Set());

    function handleClose(id) {
        setCompletedTasks(prev => {
            const newCompletedTasks = new Set(prev);
            newCompletedTasks.delete(id);
            return newCompletedTasks;
        });

        const newTasks = taskList.filter(task => task.id !== id);
        setTaskList(newTasks);
    }

    function handleComplete(id) {
        setCompletedTasks(prev => {
            const newCompletedTasks = new Set(prev);
            if (newCompletedTasks.has(id)) {
                newCompletedTasks.delete(id);
            } else {
                newCompletedTasks.add(id);
            }
            return newCompletedTasks;
        });
    }

    return (
        <ul className='taskList'>
            {taskList.map((task) => (
                <li key={task.id} className={completedTasks.has(task.id) ? 'complete' : ''}>
                    <button className="icon-button complete-button" onClick={() => handleComplete(task.id)}>
                        {/* Add your SVG or icon here */}
                    </button>

                    <span className="task-text">{task.text}</span>

                    <button className="icon-button delete-button" onClick={() => handleClose(task.id)}>
                        {/* Add your SVG or icon here */}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ListItem;
