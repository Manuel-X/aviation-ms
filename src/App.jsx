import { useState, useEffect } from 'react';
import './App.css';
import RiddleQuestion from './RiddleQuestion';

function App() {
  const initialQuestions = [
    {
      question: "How many years of government contracting experience does IS4TS bring to its clients?",
      options: ["3","5", "10", "20"],
      answer: "20",
      message_right: "Correct! With two decades of experience, IS4TS is well-versed in government regulations, including FAR, DFARS, DCS, and ITAR compliance.",
      message_wrong: "Not quite! IS4TS has 20 years of experience in government contracting, ensuring compliance and expertise in handling defense and commercial projects.",
    },
    {
      question: "How many years of government contracting experience does IS4TS bring to its clients?",
      options: ["3","5", "10", "20"],
      answer: "20",
      message_right: "Correct! With two decades of experience, IS4TS is well-versed in government regulations, including FAR, DFARS, DCS, and ITAR compliance.",
      message_wrong: "Not quite! IS4TS has 20 years of experience in government contracting, ensuring compliance and expertise in handling defense and commercial projects.",
    },
    {
      question: "How many years of government contracting experience does IS4TS bring to its clients?",
      options: ["3","5", "10", "20"],
      answer: "20",
      message_right: "Correct! With two decades of experience, IS4TS is well-versed in government regulations, including FAR, DFARS, DCS, and ITAR compliance.",
      message_wrong: "Not quite! IS4TS has 20 years of experience in government contracting, ensuring compliance and expertise in handling defense and commercial projects.",
    },
    {
      question: "How many years of government contracting experience does IS4TS bring to its clients?",
      options: ["3","5", "10", "20"],
      answer: "20",
      message_right: "Correct! With two decades of experience, IS4TS is well-versed in government regulations, including FAR, DFARS, DCS, and ITAR compliance.",
      message_wrong: "Not quite! IS4TS has 20 years of experience in government contracting, ensuring compliance and expertise in handling defense and commercial projects.",
    },
    // (repeat the same structure for other questions)
  ];

  // Load stored data or set default
  const storedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
  const storedCompleted = JSON.parse(localStorage.getItem('completed')) || false;

  const [answers, setAnswers] = useState(storedAnswers);
  const [showResult, setShowResult] = useState(storedCompleted);
  const [startGame, setStartGame] = useState(false);
  const [allCorrect, setAllCorrect] = useState(storedCompleted);

  const handleAnswer = (index, isCorrect) => {
    const updatedAnswers = { ...answers, [index]: isCorrect };
    setAnswers(updatedAnswers);

    // Check if all answers are completed
    if (Object.keys(updatedAnswers).length === initialQuestions.length) {
      const allRight = Object.values(updatedAnswers).every((correct) => correct);
      setAllCorrect(allRight);
      setShowResult(true);
      localStorage.setItem('answers', JSON.stringify(updatedAnswers));
      localStorage.setItem('completed', JSON.stringify(allRight));
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setShowResult(false);
    setAllCorrect(false);
    localStorage.removeItem('answers');
    localStorage.removeItem('completed');
  };

  return (
    <div style={{ textAlign: "center", padding: "10px", color: "#E0E0E0", fontFamily: "'Poppins', sans-serif", overflow:'hidden', width:'80vw' }}>
      

      <img style={{width:"80vw", marginBottom:"100px"}} src="https://is4tsusa.com/wp-content/uploads/2023/12/IS4TS_LOGO_high.png"/>
      {/* Show buttons only if the game has not started */}
      {!startGame && !showResult && (
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => window.open("https://is4tsusa.com/", "_blank")}
            style={{
              margin: "10px",
              padding: "15px 30px",
              border: "none",
              background: "linear-gradient(to right, #1505f8, rgb(59, 103, 224)", // Orange to Yellow gradient
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.3s ease-in-out",
              width:'80vw'
            }}
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(to right, #1505f8, rgb(59, 103, 224)")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(to right, #1505f8, rgb(59, 103, 224)")}
          >
            Visit Our Website!
          </button>
          <button
            onClick={() => setStartGame(true)} // Start the game
            style={{
              margin: "10px",
              padding: "15px 30px",
              border: "none",
              background: "linear-gradient(to right,rgb(19, 165, 63),rgb(81, 233, 89))", // Blue to light cyan gradient
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.3s ease-in-out",
               width:'80vw'
            }}
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(to right, #2768a1, #00B5E2)")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(to right, #3A7BD5, #00D2FF)")}
          >
            Enter Giveaway Game!
          </button>
        </div>
      )}

      {/* Show questions or results */}
      {showResult ? (
        <div
          style={{
            backgroundColor: allCorrect ? "#2E7D32" : "#D32F2F",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
            width: "80%",
            margin: "auto",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
            {allCorrect ? "Congratulations! 🎉" : "Oops! Try Again 😢"}
          </h2>
          <p style={{ fontSize: "18px", marginTop: "10px", color: "#fff" }}>
            {allCorrect
              ? "Go back to the booth for your giveaway and show this screen!"
              : "Not all answers were correct. Give it another shot!"}
          </p>

          {/* Show Retry button only if not all answers are correct */}
          {!allCorrect && (
            <button
              onClick={restartQuiz}
              style={{
                marginTop: "15px",
                padding: "12px 20px",
                border: "none",
                backgroundColor: "#007BFF",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
            >
              Retry
            </button>
          )}

          {/* Show Visit Website button after all questions are answered */}
          {allCorrect && (
            <button
              onClick={() => window.open("https://is4tsusa.com/", "_blank")}
              style={{
                marginTop: "15px",
                padding: "12px 20px",
                border: "none",
                background: "linear-gradient(to right, #1505f8, rgb(59, 103, 224)", // Orange to Yellow gradient
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.background = "linear-gradient(to right, #1505f8, rgb(59, 103, 224)")}
              onMouseOut={(e) => (e.target.style.background = "linear-gradient(to right, #1505f8, rgb(59, 103, 224)")}
            >
              Visit Our Website!
            </button>
          )}
        </div>
      ) :  startGame? (

        <>

        <div style={{color:"gray", fontSize:24, textAlign:"start"}}>Answer all these questions right for a chance to get a valuable giveaway!</div>
        {initialQuestions.map((question, index) => (
          <>
          <RiddleQuestion
            key={index}
            index={index}
            question={question}
            onAnswer={handleAnswer}
          />
          </>
        ))}
        </>
      )
      :
      <></>
      }
    </div>
  );
}

export default App;
