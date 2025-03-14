import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import { PomodoroTimer } from "./PomodoroTimer";
import styles from "./TodoList.module.css"

export const TodoList = ({ tasks, deleteTask, editTask, toggleTaskStatus }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div>
      <ul className={styles.todoList}>
        {tasks.map((task, index) => (
          <TodoItem
            key={index}
            index={index}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleTaskStatus={toggleTaskStatus} 
            onStartPomodoro={() => setSelectedTask(task)}
          />
        ))}
      </ul>

      {selectedTask && (
        <PomodoroTimer
          taskName={selectedTask.text}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};
