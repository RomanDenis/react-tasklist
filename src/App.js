import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Lists from './components/Lists';
import TodoListPage from './components/TodoListPage';
import TodayTaskPage from './components/Today';

function App() {
  const [lists, setLists] = useState([])
  useEffect(() => {
    const ListsEndpoint = 'https://localhost:5001/api/React';
    fetch(ListsEndpoint)
      .then(response => response.json())
      .then(res => setLists(res));
  }, [])

  return (
    <div className="App">
      <div id="Main_box">
        <div id="sidebar">
          <Lists lists={lists} />
          <Link to="/today"> <button id="TaskTodayButton"> TaskToday</button></Link>
        </div>
        <div id="tasks">
          <Routes>
            <Route path="/todo-list/:id" element={<TodoListPage />} />
            <Route path="/today" element={<TodayTaskPage />}> </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
