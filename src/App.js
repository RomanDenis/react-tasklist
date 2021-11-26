import './App.css';
import React, { useEffect, useState } from 'react';
import Lists from './components/Lists';
import Tasks from './components/Tasks';

function App() {
  const [lists, setLists] = useState([])
  const [tasks, setTasks] = useState([])
  const [selectedList, setSelectedList] = useState(1)
  const title = useTextField('')
  const description = useTextField('')
  const duedate = useTextField('')


  useEffect(() => {
    const ListsEndpoint = 'https://localhost:5001/api/React';
    const TasksEndpoint = 'https://localhost:5001/api/React/tasks';
    fetch(ListsEndpoint)
      .then(response => response.json())
      .then(res => setLists(res));
    fetch(TasksEndpoint)
      .then(response => response.json())
      .then(res => setTasks(res))
  }, [])

  const getid = (id) => {
    setSelectedList(parseInt(id))
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
  function CreateInDB(task) {
    let createTaskEndpoint = `https://localhost:5001/api/Tasks?listid=${task.taskListId}`
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

  const changeTask = (id, state) => {
    let element = tasks.find(t => t.id === id)
    let index = tasks.findIndex(t => t.id === id)
    element.done = state
    updateTask(element)
    tasks.splice(index, 1, element)
    setTasks(tasks.slice(0))
  }
  const deleteTask = (id) => {
    deleteInDB(id);
    setTasks(tasks.filter(t => t.id != id));
  }
  function onSubmitTaskHandler(event) {
    event.preventDefault();
    let task = {
      title: title.value,
      done: false,
      description: description.value,
      dueDate: duedate.value,
      taskListId: selectedList
    }
    CreateInDB(task)
      .then(res => task.id = res.id)
    setTasks([...tasks, task])
  }
  function useTextField(init) {
    const [value, setValue] = useState(init);
    return {
      value: value,
      onChange: (e) => setValue(e.target.value)
    };
  }

  return (
    
    <div className="App">
      <div id="Main_box">
        <Lists lists={lists} onClick={getid} />
        <div id="tasks">
          <section id="contacts">
            <Tasks tasks={tasks} activeList={selectedList} onClick={deleteTask} onChange={changeTask}></Tasks>
          </section>
          <form onSubmit={onSubmitTaskHandler} name="create">
            <input type="text" name="title" required placeholder="title" {...title} />
            <input type="text" name="description" placeholder="description" {...description} />
            <input type="date" name="dueDate" placeholder="dueDate"{...duedate} />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;


