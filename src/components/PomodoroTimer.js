import React, { Component } from "react";
import styles from "./PomodoroTimer.module.css";

export class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInput: 25,
      secondsLeft: 25 * 60,
      isRunning: false,
      isWorkSession: true,
    };
  }

  componentDidMount() {
    this.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isRunning && this.state.secondsLeft > 0 && !this.timer) {
      this.timer = setInterval(() => {
        this.setState((prevState) => ({
          secondsLeft: prevState.secondsLeft - 1,
        }));
      }, 1000);
    } else if (!this.state.isRunning || this.state.secondsLeft === 0) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (this.state.timeInput > 0) {
      this.setState({
        secondsLeft: this.state.timeInput * 60,
        isRunning: true,
      });
    }
  };

  pauseTimer = () => {
    this.setState({ isRunning: false });
  };

  switchMode = (mode) => {
    this.setState({
      isRunning: false,
      isWorkSession: mode === "work",
      timeInput: 25,
      secondsLeft: 25 * 60,
    });
  };

  formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  handleChange = (event) => {
    this.setState({ timeInput: Number(event.target.value) });
  };

  render() {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>Task: {this.props.taskName}</p>

          <div className={styles.pomodoroButtons}>
            <button
              onClick={() => this.switchMode("work")}
              className={styles.pomodoroBtn}
            >
              Work
            </button>
            <button
              onClick={() => this.switchMode("break")}
              className={styles.pomodoroBtn}
            >
              Break
            </button>
          </div>

          <input
            type="number"
            min="1"
            value={this.state.timeInput}
            onChange={this.handleChange}
            className={styles.pomodoroInput}
          />

          <h3>{this.state.isWorkSession ? "Work Session" : "Break Time"}</h3>
          <h3 className={styles.timerDisplay}>{this.formatTime(this.state.secondsLeft)}</h3>

          <div className={styles.pomodoroButtons}>
            <button onClick={this.startTimer} className={styles.pomodoroBtn}>
              {this.state.isRunning ? "Running" : "Start"}
            </button>
            <button onClick={this.pauseTimer} className={styles.pomodoroBtnPause}>
              Pause
            </button>
            <button onClick={this.props.onClose} className={styles.pomodoroBtnClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
