import React from 'react';
import Task from './Task'


const Tasks = (props) => {
    let tasks = props.tasks.filter(t =>parseInt(props.activeList) === t.taskListId);
    return (
        <div className="tasks">
            <ul >
               {tasks.map(t =>
                    <li className={(t.done) ? "doneTask": ""} key={t.id}> 
                    <Task task={t} onChange={props.onChange} onClick={props.onClick}></Task> </li>
                )}
            </ul>
        </div>
    )
};
export default Tasks;
