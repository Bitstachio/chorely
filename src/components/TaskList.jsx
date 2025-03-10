import styles from "./TaskList.module.css";
import {useState} from "react";

function TaskList({tasks, onEditTask, onDeleteTask}) {
    const [editIndex, setEditIndex] = useState(-1);
    const [newDescription, setNewDescription] = useState("");

    const handleNewDescriptionChange = e => {
        setNewDescription(e.target.value);
    }

    // Button actions
    const actionSave = (index, newDescription) => {
        if (newDescription.trim()) onEditTask(index, newDescription);
        setEditIndex(-1);
    };
    const actionCancel = () => setEditIndex(-1);
    const actionEdit = (index, description) => {
        setNewDescription(description);
        setEditIndex(index);
    };
    const actionDelete = index => {
        onDeleteTask(index);
        setEditIndex(-1);
    };

    return (
        <ul>
            {tasks.map((task, index) =>
                <li key={index} className={styles.task}>
                    {editIndex === index ? (
                        <>
                            <input type="text" value={newDescription} onChange={handleNewDescriptionChange}/>
                            <button onClick={() => actionSave(index, newDescription)}>Save</button>
                            <button onClick={actionCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            {task.description}
                            <button onClick={() => actionEdit(index, task.description)}>Edit</button>
                        </>
                    )}
                    <button onClick={() => actionDelete(index)}>Delete</button>
                </li>
            )}
        </ul>
    );
}

export default TaskList;
