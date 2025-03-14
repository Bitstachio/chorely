import React, {useState} from "react";
import styles from "./TaskList.module.css";

function TaskList({tasks = [], completedTasks = [], onCompleteTask, onEditTask, onDeleteTask}) {
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
        <ul data-testid="task-list">
            {tasks.map((task, index) =>
                <li key={index} className={`${styles.task} ${completedTasks.includes(task.id) ? styles.done : ""}`}>
                    {editIndex === index ? (
                        <>
                            <input data-testid={`input-description-${index}`} type="text" value={newDescription} onChange={handleNewDescriptionChange}/>
                            <div>
                                <input type="checkbox" data-testid={`checkbox-done-${index}`} checked={completedTasks.includes(task.id)}
                                       onChange={e => onCompleteTask(task.id, !e.target.checked)}/>
                            </div>
                            <button data-testid={`button-save-${index}`} onClick={() => actionSave(index, newDescription)}>Save</button>
                            <button data-testid={`button-cancel-${index}`} onClick={actionCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p data-testid={`p-description-${index}`}>{task.description}</p>
                            <div>
                                <input type="checkbox" data-testid={`checkbox-done-${index}`} checked={completedTasks.includes(task.id)}
                                       onChange={e => onCompleteTask(task.id, !e.target.checked)}/>
                            </div>
                            <button data-testid={`button-edit-${index}`} onClick={() => actionEdit(index, task.description)}>Edit</button>
                        </>
                    )}
                    <button data-testid={`button-delete-${index}`} onClick={() => actionDelete(index)}>Delete</button>
                </li>
            )}
        </ul>
    );
}

export default TaskList;
