import React, { useState } from "react";

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
    <li className="todo-item">
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
          className="edit-input"
          autoFocus
        />
      ) : (
        <span onClick={() => onStartPomodoro(task)}>{task.text}</span>
      )}

      <div className="todo-actions">
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? "sv" : "ed"}
        </button>
        <button className="delete-btn" onClick={() => deleteTask(index)}>
          del
        </button>
      </div>
    </li>
  );
};
