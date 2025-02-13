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

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index, newTask) => {
    if (newTask.trim()) {
      const updatedTask = [...tasks];
      updatedTask[index] = newTask;
      setTasks(updatedTask);
    }
  };

  return (
    <div className="todo-wrapper">
      <h2 className="todo-title">Get Things Done!</h2>
      <TodoForm addTask={addTask} />
      <TodoList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
};
