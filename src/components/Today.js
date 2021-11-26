import TodayTask from './TodayTask'
import React, { useEffect, useState } from 'react';

const TodayTaskPage = (props) => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const TasksEndpoint = 'https://localhost:5001/api/collection/today';
        fetch(TasksEndpoint)
            .then(response => response.json())
            .then(res => setTasks(res))
    }, [tasks])

    const changeTask = (id, state) => {
        let element = tasks.find(t => t.id === id)
        let index = tasks.findIndex(t => t.id === id)
        element.done = state
        updateTask(element)
        tasks.splice(index, 1, element)
        setTasks(tasks.slice(0))
    }

    function updateTask(task) {
        let updateTaskEnpoint = `https://localhost:5001/api/Tasks`
        return fetch(updateTaskEnpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
    }
    const deleteTask = (id) => {
        deleteInDB(id);
        setTasks(tasks.filter(t => t.id != id));
    }
    function deleteInDB(id) {
        let deleteTaskEndpoint = `https://localhost:5001/api/Tasks/${id}`
        return fetch(deleteTaskEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(`id:${id}`)
        })
            .then(response => response.status === 204 ? console.log('remove') : Promise.reject(response.statusText))
    }
    return (
        <div className="tasks">
            <ul >
                {tasks.map(t =>
                    <li className={(t.done) ? "doneTask" : ""} key={t.id}>
                        <TodayTask task={t} onChange={changeTask} onClick={deleteTask}></TodayTask> </li>
                )}
            </ul>
        </div>
    )
};
export default TodayTaskPage;