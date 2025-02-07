import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export const TodoBlock = () => {
  const [tasks, setTasks] = useState([
    "Ronaldo Suiiiiiiiiiii",
    "go gym",
    "play football",
    "Messi gimere wowo"
  ]);
  const addTask = (task) => {
    if (task.trim()) {
      setTasks([...tasks, task]);
    }
  };

  return (
    <div className="todo-wrapper">
      <h2 className="todo-title">Get Things Done!</h2>
      <TodoForm addTask={addTask} />
      <TodoList tasks={tasks} />
    </div>
  );
};
