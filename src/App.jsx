import { useState, useEffect } from 'react';
import './App.css';
import RiddleQuestion from './RiddleQuestion';

import logo from "./assets/logo.webp"; // Adjust path as needed
import { motion } from "framer-motion";
function App() {
  const [loading, setLoading] = useState(true); // State to manage loader visibility

  // Simulate a 2-second delay to show the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after 2 seconds
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const now = new Date();
  const isFriday = now.getDay() === 5; // 5 represents Friday in JS Date API

  // Set time based on the day
  const raffleTime = isFriday ? "12:00 PM" : "3:00 PM";

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
  };

  const endGame = () => {
    const allRight = Object.values(answers).every((correct) => correct);
    setAllCorrect(allRight);
    setTimeout(()=>{
      setShowResult(true);
    },500)
  

    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('completed', JSON.stringify(allRight));
  };

  const restartQuiz = () => {
    setAnswers({});
    setShowResult(false);
    setAllCorrect(false);
    localStorage.removeItem('answers');
    localStorage.removeItem('completed');
  };

  return (
<>
    {loading ?
      ( 
        <div style={{width:'100vw', height:'100vh', backgroundColor:'white'}}>
          <div  className="spinner"></div>
        </div>
      )
      :
      (

        <motion.div         
        initial={{ opacity: 0, x: -700 }}
        animate={!loading ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        >

   
        <div style={{ textAlign: "center", color: "#E0E0E0", fontFamily: "'Poppins', sans-serif", overflow:'hidden', width:'100vw', marginBottom:20 }}>
      

        <>
          <img style={{width:"84vw", marginBottom:"40px", marginTop:"20px"}} src={logo} />
          
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
                  animation: "scaleUp 0.4 ease-in-out",
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
                   width:'84vw',
                   animation: "scaleUp 0.4 ease-in-out",
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
                animation: "scaleUp 1.2 ease-in-out",
              }}
            >
              <h2 style={{ fontSize: "30px", fontWeight: "medium", color: "#fff", textAlign:"start" }}>
                {allCorrect ? "Congratulations on completing the quiz! 🎉" : "Oops! Try Again 😢"}
              </h2>
              <p style={{ fontSize: "18px", marginTop: "10px", color: "#fff", textAlign:"start", lineHeight:2 }}>
                {allCorrect
                  ? 
                  <>
                  <div>
                  To enter our raffle for the giveaway, head over to our booth and show us this screen confirming you've finished.
                  </div>

                  <div style={{ marginTop: 20 }}>
                    Join us for the raffle drawing at {raffleTime} for the chance to win a free IS4TS speaker!
                  </div>

                  <div style={{marginTop:20}}>
                  We look forward to seeing you at our booth!
                  </div>
                  </>
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
                    backgroundColor: "green",
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
            </div>
          ) : startGame ? (
            <>
              <div style={{color:"gray", fontSize:22, textAlign:"start", marginLeft:"20px"}}>Answer all these questions right for a chance to get a valuable giveaway!</div>
              {initialQuestions.map((question, index) => (
                <RiddleQuestion
                  key={index}
                  index={index}
                  question={question}
                  onAnswer={handleAnswer}
                  onQuizEnd={endGame}
                  totalQuestions={initialQuestions.length}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      
      </div>
      </motion.div>
      )
    }
</>
  )
};

  
  


export default App;
