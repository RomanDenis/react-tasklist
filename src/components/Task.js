import React, { Component } from 'react'

const Task = () => {
    return (
        <div id="task70">
            <div id="container">
                <input className="TaskIsDone" type="checkbox"
                 name = "done"></input>
                 <h2>dgd</h2>
                 <p className="Date">11/24/2021</p>
                 <button className= "deleteButton">X</button>
            </div>
            <p className="description"> dgd</p>
        
        </div>
    )
}

export default Task;