import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { ThemeToggle } from "./ThemeToggle";

export const TodoBlock = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (task.trim()) {
      const newTasks = [...tasks, { text: task, status: "inProgress" }];
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks)); 
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); 
  };

  const editTask = (index, newTask) => {
    if (newTask.trim()) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, status: task.status === "inProgress" ? "completed" : "inProgress" }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "inProgress" && task.status === "inProgress") ||
      (filterStatus === "completed" && task.status === "completed");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="todo-wrapper">
      <ThemeToggle />
      <h2 className="todo-title">Get Things Done!</h2>

      <div className="search-filter-wrapper">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TodoForm addTask={addTask} />
      <TodoList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleTaskStatus={toggleTaskStatus}
      />
    </div>
  );
};
