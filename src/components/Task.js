import React from 'react'

const Task = (props) => {
    let task = props.task;
    const onDoneChange = (event) => {
        task.done = event.target.checked;
        props.onChange(task.id, task.done);
    }
    const onDelete = (event) => {
        props.onClick(task.id);
    }

    const CheckDate = (date, done) => {
        if (done) { return "Date" }
        else {
            if (new Date(date).getTime() < new Date().setHours(0, 0, 0, 0)) {
                return "expiredDate"
            }
            else {
                return "Date"
            }
        }
    }

    return (
        <div id={task.id} >
            <div id="container">
                <input className="TaskIsDone" type="checkbox"
                    name="done" defaultChecked={task.done} onChange={onDoneChange} />
                <h2>{task.title}</h2>
                <p className={CheckDate(task.dueDate, task.done)}>{(task.dueDate.length >14) ? task.dueDate.substr(0,10) : task.dueDate}</p>
                <button className="deleteButton" onClick={onDelete} >X</button>
            </div>
            <p className="description"> {task.description}</p>
        </div>
    )
}
export default Task;
