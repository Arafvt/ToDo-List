import React, { useState } from "react";
import styles from "./TodoItem.module.css"

export const TodoItem = ({ task, index, deleteTask, editTask, toggleTaskStatus, onStartPomodoro }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      editTask(index, newTask);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={styles.todoItem}>
      <span 
        className={`status-icon ${task.status}`} 
        onClick={() => toggleTaskStatus(index)}
        title="Toggle status"
      >
        {task.status === "completed" ? "✅" : "⏳"}
      </span>

      {isEditing ? (
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          autoFocus
        />
      ) : (
        <span onClick={() => onStartPomodoro(task)}>{task.text}</span>
      )}

      <div className={styles.todoActions}>
        <button onClick={handleEdit}>
          {isEditing ? "sv" : "ed"}
        </button>
        <button onClick={() => deleteTask(index)}>
          del
        </button>
      </div>
    </li>
  );
};
