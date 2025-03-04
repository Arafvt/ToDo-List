import React, { useState, useEffect } from "react";

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
    <div className="theme-toggle">
      <span>🌙</span>
      <label className="switch">
        <input type="checkbox" checked={theme === "light"} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <span>☀️</span>
    </div>
  );
};
