import React, {useState} from "react";

export const TodoItem = ({ task, index, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);

  const handleEdit = () => {
    if (isEditing) {
      editTask(index, newTask);
    }
    setIsEditing(!isEditing)
  }
  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="edit-input"
        />
      ) : (
        task
      )}

      <div className="todo-actions">
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? "💾" : "✏️"}
        </button>
        <button className="delete-btn" onClick={() => deleteTask(index)}>
          🗑️
        </button>
      </div>
    </li>
  );
};

