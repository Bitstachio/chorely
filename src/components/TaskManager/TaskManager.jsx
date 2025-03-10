import React, {useState} from "react";
import TaskList from "../TaskList/TaskList.jsx";
import TaskForm from "../TaskForm/TaskForm.jsx";

let taskId = 0;

function TaskManager({initialTasks = [], initialCompletedTasks = []}) {
    const [tasks, setTasks] = useState(initialTasks);
    const [completedTasks, setCompletedTasks] = useState(initialCompletedTasks);

    const onAddTask = (description) => {
        const newTask = {
            description: description,
            dueDate: new Date().toISOString().split("T")[0],
            id: taskId++
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

    const onCompleteTask = (id, undo) => {
        if (undo) {
            setCompletedTasks(completedTasks.filter((element) => element !== id));
        } else {
            setCompletedTasks([...completedTasks, id]);
        }
    }

    return (
        <>
            <TaskForm onAddTask={onAddTask}/>
            <TaskList tasks={tasks} completedTasks={completedTasks} onCompleteTask={onCompleteTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask}/>
        </>
    );
}

export default TaskManager;
