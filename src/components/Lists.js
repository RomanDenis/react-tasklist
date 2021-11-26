import React from 'react';
import { Link } from 'react-router-dom';

const Lists = (props) => {
    return (
        <div className="lists">
            <ul>
                {props.lists.map(l =>
                    <li key={l.id} id={l.id} className="list">  <Link to={`/todo-list/${l.id}`}> {l.title}  ({l.countNotdoneTasks}) </Link> </li>
                )}
            </ul>
        </div>
    )  
};
export default Lists