import "./App.css";
import { ThemeProvider } from "./home/ThemeContext";
import Welcome from "./home/Welcome";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Welcome />
      </div>
    </ThemeProvider>
  );
}

export default App;
