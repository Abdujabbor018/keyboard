import { useState, useEffect } from "react";
import './App.css'
function App() {
  // 150+ so'zdan iborat ulkan baza
  const wordsDatabase = [
    // Frontend & IT
    "javascript", "react", "typescript", "frontend", "backend", "developer", "component", "interface", 
    "performance", "function", "variable", "constant", "middleware", "database", "deployment", "optimization", 
    "algorithm", "framework", "library", "software", "hardware", "network", "server", "client", "security", 
    "authentication", "authorization", "protocol", "json", "application", "browser", "document", "element", 
    "attribute", "selector", "property", "inheritance", "prototype", "asynchronous", "callback", "promise", 
    "payload", "response", "request", "endpoint", "version", "repository", "container", "virtual", "module",
    
    // Energetika va My NRG yo'nalishi
    "energy", "solar", "charging", "battery", "voltage", "current", "electric", "power", "sustainable", 
    "environment", "efficiency", "renewable", "panel", "station", "generator", "inverter", "grid", "consumption", 
    "storage", "transformer", "circuit", "wattage", "megawatt", "kilowatt", "photovoltaic", "silicon", "carbon", 
    "emission", "ecosystem", "resources", "installation", "maintenance", "monitoring", "capacity", "discharge",
    
    // Umumiy va murakkab so'zlar (tezlik uchun)
    "keyboard", "monitor", "system", "design", "workflow", "process", "quality", "standard", "project", 
    "management", "strategy", "analysis", "feedback", "experience", "solution", "product", "creative", 
    "innovation", "technology", "communication", "community", "knowledge", "structure", "platform", "resource", 
    "dynamic", "flexible", "parallel", "sequence", "internal", "external", "graphics", "resolution", "interaction", 
    "animation", "transition", "transform", "opacity", "background", "overflow", "position", "relative", 
    "absolute", "display", "flexbox", "direction", "content", "justify", "between", "around", "stretch",
    "gradient", "shimmer", "highlight", "shadow", "border", "radius", "padding", "margin", "scrolling"
  ];

  const shuffleWords = () => [...wordsDatabase].sort(() => Math.random() - 0.5);

  const [words, setWords] = useState(shuffleWords());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setUserInput(value);

    if (value === words[currentWordIndex]) {
      setScore((prev) => prev + 1);
      if (currentWordIndex === words.length - 1) {
        setWords(shuffleWords());
        setCurrentWordIndex(0);
      } else {
        setCurrentWordIndex((prev) => prev + 1);
      }
      setUserInput("");
    }
  };

  const handleRestart = () => {
    setWords(shuffleWords());
    setScore(0);
    setTime(60);
    setCurrentWordIndex(0);
    setUserInput("");
    setIsActive(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.glowBg}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>NRG <span style={{color: '#00ff9f'}}>ULTRA</span> TYPING</h1>

        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.label}>TIME</span>
            <span style={{...styles.value, color: time < 10 ? '#ff4d4d' : '#00ff9f'}}>{time}s</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.label}>WORDS</span>
            <span style={styles.value}>{score}</span>
          </div>
        </div>

        <div style={styles.wordBox}>
          {words[currentWordIndex].split("").map((char, index) => {
            let color = "rgba(255,255,255,0.15)";
            let textShadow = "none";

            if (index < userInput.length) {
              if (char === userInput[index]) {
                color = "#00ff9f";
                textShadow = "0 0 15px #00ff9f";
              } else {
                color = "#ff4d4d";
                textShadow = "0 0 15px #ff4d4d";
              }
            }

            return (
              <span key={index} style={{ color, textShadow, transition: 'all 0.1s' }}>
                {char}
              </span>
            );
          })}
        </div>

        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            disabled={!isActive}
            style={styles.input}
            placeholder={isActive ? "Type now..." : "GAME OVER"}
            autoFocus
          />
          <div style={{...styles.inputLine, width: isActive ? '100%' : '0%'}}></div>
        </div>

        <button onClick={handleRestart} style={styles.button}>
          INITIALIZE NEW SESSION
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "#020202",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', monospace, 'Courier New'",
    color: "#fff",
    margin: 0,
    overflow: "hidden",
    position: "relative"
  },
  glowBg: {
    position: "absolute",
    width: "800px",
    height: "800px",
    background: "radial-gradient(circle, rgba(0,255,159,0.03) 0%, rgba(0,0,0,0) 70%)",
    zIndex: 0
  },
  card: {
    background: "rgba(10, 10, 10, 0.95)",
    backdropFilter: "blur(30px)",
    padding: "60px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.03)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
    textAlign: "center",
    width: "550px",
    zIndex: 1
  },
  title: {
    fontSize: "10px",
    letterSpacing: "12px",
    marginBottom: "60px",
    color: "#444",
    textTransform: "uppercase"
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "50px",
    padding: "0 30px"
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  label: {
    fontSize: "8px",
    color: "#333",
    letterSpacing: "2px",
    marginBottom: "10px"
  },
  value: {
    fontSize: "36px",
    fontWeight: "300",
    fontFamily: "monospace"
  },
  wordBox: {
    fontSize: "48px",
    fontWeight: "bold",
    letterSpacing: "4px",
    marginBottom: "40px",
    minHeight: "70px",
    fontFamily: "monospace"
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "50px"
  },
  input: {
    width: "100%",
    padding: "20px",
    fontSize: "26px",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    textAlign: "center",
    letterSpacing: "4px"
  },
  inputLine: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #333, #00ff9f, #333, transparent)",
    transition: "width 0.8s ease"
  },
  button: {
    padding: "18px 45px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#666",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "10px",
    letterSpacing: "3px",
    transition: "all 0.3s",
    textTransform: "uppercase"
  }
};

export default App;