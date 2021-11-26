import Task from './Task';
import React from 'react';

const Tasks = (props) => 
{
    return (
        <div className="tasks">
            <ul >
               {props.tasks.map(t =>
                    <li className={(t.done) ? "doneTask": ""} key={t.id}> 
                    <Task task={t} onChange={props.onChange} onClick={props.onClick}></Task> </li>
                )}
            </ul>
        </div>
    )
};
export default Tasks;
