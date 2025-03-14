import React, { useState } from "react";
import styles from "./TodoForm.module.css"

export const TodoForm = ({ addTask }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(input);
    setInput(""); 
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.todoInput}
        placeholder="What task we do today?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className={styles.todoBtn}>
        Add Task
      </button>
    </form>
  );
};
