import React, { useState } from 'react'

const NewTaskForm = (props) => {
    const title = useTextField('')
    const description = useTextField('')
    const duedate = useTextField('')
    
    function onSubmitTaskHandler(event) {
        event.preventDefault();
        let task = {
            title: title.value,
            done: false,
            description: description.value,
            dueDate: duedate.value,
        }
        props.onSubmit(task)
    }

    function useTextField(init) {
        const [value, setValue] = useState(init);
        return {
            value: value,
            onChange: (e) => setValue(e.target.value)
        };
    }
    return <form onSubmit={onSubmitTaskHandler} name="create">
        <input type="text" name="title" required placeholder="title" {...title} />
        <input type="text" name="description" placeholder="description" {...description} />
        <input type="date" name="dueDate" placeholder="dueDate"{...duedate} />
        <button type="submit">Add</button>
    </form>
};
export default NewTaskForm;