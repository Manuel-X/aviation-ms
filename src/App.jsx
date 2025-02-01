import { useState, useEffect } from 'react';
import './App.css';
import RiddleQuestion from './RiddleQuestion';

function App() {
  const initialQuestions = [
    {
      question: "What key role does IS4TS play in aviation?",
      options: [
        "Providing Spare Parts, Tools, and Repair Management",
        "Developing Flight Control Systems",
        "Designing & Engineering Advanced Aerospace Components",
        "Providing Research & Development for Future Aircraft Technologies"
      ],
      answer: "Providing Spare Parts, Tools, and Repair Management",
      message_right: "You got it! IS4TS supports aviation industries by providing spare parts, specialized tools, and repair management services, ensuring operational efficiency.",
      message_wrong: " Not quite! IS4TS is a key supplier of essential aviation components, spare parts, tools, and services like repair management, ensuring high reliability and performance across global operations.",
    },
    {
      question: "IS4TS has built a strong reputation in government contracting. How long has IS4TS been a trusted partner in this field?",
      options: ["Over 3 Years","Over 5 Years", "Over 10 Years", "Over 20 Years"],
      answer: "Over 20 Years",
      message_right: "Spot on! With over 20 years of experience, IS4TS is a leader in government contracting, ensuring compliance with FAR, DFARS, DCS, and ITAR regulations while delivering top-tier solutions.",
      message_wrong: "Good try! But IS4TS has over two decades of experience, making it a trusted name in government and defense contracting worldwide.",
    },
    {
      question:"Which major companies trust IS4TS for their critical needs?",
      options:[
          "Boeing, Raytheon, and Honeywell",
          "General Electric, Pratt & Whitney, and Rolls-Royce",
          "Lockheed Martin, Northrop Grumman, and Airbus Defense",
          "BAE Systems, L3Harris, and General Dynamics"
      ],
      answer:"Lockheed Martin, Northrop Grumman, and Airbus Defense",
      message_right:"That’s right! IS4TS has partnered with global industry leaders like Lockheed Martin, Northrop Grumman, and Airbus Defense, delivering high-quality tools, equipment, and spare parts.",
      message_wrong:"Nice guess! IS4TS works with top aerospace and defense companies like Lockheed Martin, Northrop Grumman, and Airbus Defense, ensuring they receive reliable equipment, spare parts, and technical support for mission-critical operations."
    },
    {
      question:"How does IS4TS support global military operations?",
      options:[
          "Developing Defense Training Video Games",
          "Manufacturing Military Uniforms",
          "Supplying Mission-Critical Equipment, Spare Parts, and Tools",
          "Operating Military Recruitment Centers"
      ],
      answer:"Supplying Mission-Critical Equipment, Spare Parts, and Tools",
      message_right:"Perfect! IS4TS provides high-quality tools, spare parts, and mission-critical equipment, supporting global military and defense operations.",
      message_wrong:"Not the one! IS4TS is a trusted supplier for defense organizations, ensuring they receive top-tier spare parts, equipment, and technical support."
    },

    {
      question: "What truly sets IS4TS apart as a government contractor?",
      options: ["8(a) SBA Certification & Extensive Government Experience", "Military Equipment Manufacturing Capabilities","Research & Development Expertise", "Strategic Global Defense Alliances"],
      answer: "8(a) SBA Certification & Extensive Government Experience",
      message_right: "Nailed it! IS4TS is 8(a) SBA Certified, highlighting its commitment to excellence, government compliance, and small business growth in highly regulated industries.",
      message_wrong: "Great try, but not quite the right one. IS4TS’s certifications, especially the 8(a), ensure that it remains a trusted partner for aerospace and defense contracting worldwide.",
    },
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
      setTimeout(()=>{
        setShowResult(true);
      },2000)
      
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
    <div style={{ textAlign: "center", color: "#E0E0E0", fontFamily: "'Poppins', sans-serif", overflow:'hidden', width:'100vw', marginBottom:20 }}>
      

      <img style={{width:"84vw", marginBottom:"40px", marginTop:"20px"}} src="https://is4tsusa.com/wp-content/uploads/2023/12/IS4TS_LOGO_high.png"/>
      {/* Show buttons only if the game has not started */}
      {!startGame && !showResult && (
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => window.open("https://is4tsusa.com/", "_blank")}
            style={{
              margin: "1px",
              padding: "15px 50px",
              border: "none",
              background: "linear-gradient(to right, #13183F, #3F75B3", // Orange to Yellow gradient
              color: "white",
              fontSize: "18px",
              fontWeight: "medium",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.3s ease-in-out",
              width:'84vw'
            }}
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(to right, #13183F, #3F75B3")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(to right, #13183F, #3F75B3")}
          >
            Visit Our Website
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
              fontWeight: "medium",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.3s ease-in-out",
               width:'84vw'
            }}
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(to right, #089D43, rgb(142,199,65)")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(to right,  #089D43, rgb(142,199,65)")}
          >
            Enter Giveaway Game
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
          <h2 style={{ fontSize: "24px", fontWeight: "medium", color: "#fff" }}>
            {allCorrect ? "Congratulations on completing the quiz! 🎉" : "Oops! Try Again 😢"}
          </h2>
          <p style={{ fontSize: "18px", marginTop: "10px", color: "#fff" }}>
            {allCorrect
              ? "To enter our raffle for the giveaway, head over to our booth and show us this screen confirming you've finished. We can't wait to see you!"
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
                fontWeight: "medium",
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
              Visit Our Website
            </button>
          )}
        </div>
      ) :  startGame? (

        <>

        <div style={{color:"gray", fontSize:22, textAlign:"start", marginLeft:"20px"}}>Answer all these questions right for a chance to get a valuable giveaway!</div>
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
