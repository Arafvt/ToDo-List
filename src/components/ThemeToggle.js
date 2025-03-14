import React, { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css"

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={styles.themeToggle}>
      <span>🌙</span>
      <label className={styles.switch}>
        <input type="checkbox" checked={theme === "light"} onChange={toggleTheme} />
        <span className={styles.slider}></span>
      </label>
      <span>☀️</span>
    </div>
  );
};
