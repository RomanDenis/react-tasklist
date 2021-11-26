import React from 'react';

const Lists = (props) => {
    return (
        <div className="lists">
            <ul onClick={event=> props.onClick(event.target.id)}>
                {props.lists.map(l =>
                    <li key={l.id} id={l.id} className="list"> {l.title} ({l.countNotdoneTasks})</li>
                )}
            </ul>
        </div>
    )  
};
export default Lists