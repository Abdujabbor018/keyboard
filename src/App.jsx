import { useState, useEffect } from "react";

function App() {
  const wordsDatabase = [
    "javascript", "react", "typescript", "frontend", "backend", "developer", "component", "interface", 
    "performance", "function", "variable", "constant", "middleware", "database", "deployment", "optimization", 
    "algorithm", "framework", "library", "software", "hardware", "network", "server", "client", "security", 
    "authentication", "authorization", "protocol", "json", "application", "energy", "solar", "charging", 
    "battery", "voltage", "current", "electric", "power", "sustainable", "environment", "efficiency"
  ];

  const shuffleWords = () => [...wordsDatabase].sort(() => Math.random() - 0.5);

  const [words, setWords] = useState(shuffleWords());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [isActive, setIsActive] = useState(true);
  
  // Responsive holatni kuzatish uchun state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
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
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
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

  // Ekran o'lchamiga qarab dinamik stillar
  const isMobile = windowWidth < 600;

  const dynamicStyles = {
    card: {
      ...styles.card,
      width: isMobile ? "90%" : "550px",
      padding: isMobile ? "30px 20px" : "60px",
    },
    wordBox: {
      ...styles.wordBox,
      fontSize: isMobile ? "32px" : "48px",
      minHeight: isMobile ? "50px" : "70px",
    },
    title: {
      ...styles.title,
      fontSize: isMobile ? "8px" : "10px",
      letterSpacing: isMobile ? "6px" : "12px",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glowBg}></div>

      <div style={dynamicStyles.card}>
        <h1 style={dynamicStyles.title}>NRG <span style={{color: '#00ff9f'}}>ULTRA</span> TYPING</h1>

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

        <div style={dynamicStyles.wordBox}>
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
            style={{...styles.input, fontSize: isMobile ? "20px" : "26px"}}
            placeholder={isActive ? "Type..." : "FINISH"}
            autoFocus
          />
          <div style={{...styles.inputLine, width: isActive ? '100%' : '0%'}}></div>
        </div>

        <button onClick={handleRestart} style={styles.button}>
          {isMobile ? "RESTART" : "INITIALIZE NEW SESSION"}
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
    fontFamily: "monospace",
    color: "#fff",
    margin: 0,
    overflow: "hidden",
    position: "relative"
  },
  glowBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at center, rgba(0,255,159,0.03) 0%, rgba(0,0,0,0) 70%)",
    zIndex: 0
  },
  card: {
    background: "rgba(10, 10, 10, 0.95)",
    backdropFilter: "blur(30px)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.03)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
    textAlign: "center",
    zIndex: 1,
    transition: "all 0.3s ease"
  },
  title: {
    marginBottom: "40px",
    color: "#444",
    textTransform: "uppercase"
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
    padding: "0 10px"
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  label: {
    fontSize: "8px",
    color: "#333",
    letterSpacing: "2px",
    marginBottom: "5px"
  },
  value: {
    fontSize: "28px",
    fontWeight: "300"
  },
  wordBox: {
    fontWeight: "bold",
    letterSpacing: "4px",
    marginBottom: "30px",
    wordBreak: "break-all" // Uzun so'zlar mobil ekranda sig'ishi uchun
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "40px"
  },
  input: {
    width: "100%",
    padding: "10px",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    textAlign: "center",
    letterSpacing: "2px"
  },
  inputLine: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #00ff9f, transparent)",
    margin: "0 auto"
  },
  button: {
    padding: "15px 30px",
    background: "transparent",
    border: "1px solid rgba(0,255,159,0.3)",
    color: "#00ff9f",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "10px",
    letterSpacing: "2px",
    textTransform: "uppercase"
  }
};

export default App;