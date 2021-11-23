import logo from './logo.svg';
import './App.css';

import Task from './components/Task'
import Lists from './components/Lists';

function App() {
  return (
    <div className="App">
      <div id="Main_box">
        <Lists />
        <div id="tasks">
          <section id="contacts">
            <Task></Task>
            <Task></Task>
            <Task></Task>
          </section>
          <form name="create">
            <input type="text" name="title" required placeholder="title" />
            <input type="text" name="description" placeholder="description" />
            <input type="date" name="dueDate" placeholder="dueDate" />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
