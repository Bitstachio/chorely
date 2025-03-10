import React, {useState} from "react";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";

function TaskManager({initialTasks = []}) {
    const [tasks, setTasks] = useState(initialTasks);

    const onAddTask = (description) => {
        const newTask = {
            description: description,
            dueDate: new Date().toISOString().split("T")[0]
        }
        setTasks([...tasks, newTask]);
    };

    const onEditTask = (index, newDescription) => {
        const editedTasks = [...tasks];
        editedTasks[index].description = newDescription;
        setTasks(editedTasks);
    };

    const onDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <>
            <TaskForm onAddTask={onAddTask}/>
            <TaskList tasks={tasks} onEditTask={onEditTask} onDeleteTask={onDeleteTask}/>
        </>
    );
}

export default TaskManager;
