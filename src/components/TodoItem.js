import React from "react";

export const TodoItem = ({ task }) => {
  return (
    <li className="todo-item">
      {task}
      <div className="todo-actions">
        <button className="edit-btn">+</button>
        <button className="delete-btn">-</button>
      </div>
    </li>
  );
};

