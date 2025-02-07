import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ tasks }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <TodoItem key={index} task={task} />
      ))}
    </ul>
  );
};

