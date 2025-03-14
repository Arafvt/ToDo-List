import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./TodoBlock.module.css"

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
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task) => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, status: "inProgress" }]);
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index, newTask) => {
    if (newTask.trim()) {
      setTasks(tasks.map((task, i) => (i === index ? { ...task, text: newTask } : task)));
    }
  };

  const toggleTaskStatus = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, status: task.status === "inProgress" ? "completed" : "inProgress" } : task
    ));
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
    <div className={styles.todoWrapper}>
      <ThemeToggle />
      <h2 className={styles.todoTitle}>Get Things Done!</h2>

      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.filterSelect}
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
