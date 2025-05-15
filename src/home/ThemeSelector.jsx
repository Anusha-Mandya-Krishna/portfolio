import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import "./ThemeSelector.css";

const ThemeSelector = () => {
  const { theme, toggleTheme, themes } = useContext(ThemeContext);

  return (
    <button
      onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
      className="theme-toggle"
    >
      {theme === "dark" ? (
        <FaSun className="icon sun" />
      ) : (
        <FaMoon className="icon moon" />
      )}
    </button>
  );
};

export default ThemeSelector;
