"use client";
import { useEffect, useState } from "react";
import { GoSun } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Run once on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const enabled = document.documentElement.classList.toggle("dark");
    setIsDark(enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
  };

  return <button className="cursor-pointer" onClick={toggleTheme}>{isDark ? <GoSun size={20}/> : <FaRegMoon size={20}/>}</button>;
}
