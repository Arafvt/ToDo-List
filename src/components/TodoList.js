import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ tasks, deleteTask, editTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          index={index}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
};
