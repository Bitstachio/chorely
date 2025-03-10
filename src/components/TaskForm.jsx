import {useState} from "react";

function TaskForm({onAddTask}) {
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) return;
        onAddTask(task);
        setTask("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="task">Task</label><br/>
            <input type="text" name="task" id="task" placeholder="Enter task" value={task}
                   onChange={(e) => setTask(e.target.value)}/>
            <button>Add</button>
        </form>
    );
}

export default TaskForm;
