import Tasks from './Tasks'
import NewTaskForm from './NewTaskForm'
import React, { useState,useEffect } from 'react'
import { useParams } from "react-router-dom";

const TodoListPage = (props) => {
    const [tasks, setTasks] = useState([])
    const {id} = useParams()
    useEffect(() => {
        const TasksEndpoint = `https://localhost:5001/api/lists/${id}/tasks?all=true`;
        fetch(TasksEndpoint)
         .then(response => response.json())
         .then(res => setTasks(res))
     }, [id])
    
    function CreateInDB(task) {
        console.log(task)
        let createTaskEndpoint = `https://localhost:5001/api/Tasks?listid=${id}`
        return fetch(createTaskEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: task.title,
                done: task.done,
                description: task.description,
                dueDate: task.dueDate
            })
        })
            .then(response => response.json())
    }

    function onSubmitTaskHandler(task) {
        CreateInDB(task)
            .then(res => task.id = res.id)
        setTasks([...tasks, task])
    }
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
        <div className="TaskPage">
            <Tasks tasks={tasks} onChange={changeTask} onClick={deleteTask}> </Tasks>
            <NewTaskForm onSubmit={onSubmitTaskHandler}> </NewTaskForm>
        </div>
    )
};
export default TodoListPage;

