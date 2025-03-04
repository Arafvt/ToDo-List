import React, { useState, useEffect } from "react";
import "../App.css";

const workIntervals = [1, 1, 15, 5];

export const PomodoroTimer = ({ taskName, onClose }) => {
  const [currentInterval, setCurrentInterval] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(workIntervals[0] * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      const nextInterval = (currentInterval + 1) % workIntervals.length;
      setCurrentInterval(nextInterval);
      setSecondsLeft(workIntervals[nextInterval] * 60);
      setIsWorkSession(nextInterval % 2 === 0);
      setIsRunning(true);
    }

    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, currentInterval]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Pomodoro Timer</h2>
        <p>Task: <strong>{taskName}</strong></p> 
        <h3>{isWorkSession ? "Work Session" : "Break Time"}</h3>
        <h3 className="timer-display">{formatTime(secondsLeft)}</h3>
        <div className="pomodoro-buttons">
          <button onClick={startTimer} className="pomodoro-btn">
            {isRunning ? "Running" : "Start"}
          </button>
          <button onClick={pauseTimer} className="pomodoro-btn pause">
            Pause
          </button>
          <button onClick={onClose} className="pomodoro-btn close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
