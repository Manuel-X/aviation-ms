import { useState } from 'react';

function RiddleQuestion({ question, index, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fade, setFade] = useState(false);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleClick = (option) => {
    setSelectedOption(option);
    const correct = option === question.answer;
    setIsCorrect(correct);
    setMessage(correct ? question.message_right : question.message_wrong);

    // Notify parent about the answer (whether it's correct or not)
    onAnswer(index, correct); // Pass the index and whether the answer is correct

    setTimeout(() => {
      setShowModal(true);
      setTimeout(() => setFade(true), 10);
    }, 400);
  };

  const closeModal = () => {
    setFade(false);
    setTimeout(() => setShowModal(false), 300);
  };

  return (
    <>
      <div
        style={{
          overflowX: 'hidden',
          marginTop: "20px",
          backgroundColor: "#1E1E1E",
          border: "1px solid #333",
          padding: "20px",
          borderRadius: "15px",
          width: "70vw",
          textAlign: "left",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          fontFamily: "'Poppins', sans-serif",
          transition: "all 0.3s ease-in-out",
          color: "#E0E0E0",
        }}
      >
        <h3 style={{ fontSize: 24, color: "#FFFFFF", marginBottom: "15px" }}>
          Q{index + 1} - {question.question}
        </h3>

        {question.options.map((option) => (
          <div key={option} style={{ display: "flex", width: "100%" }}>
            <div
              onClick={() => handleClick(option)}
              style={{
                border: "2px solid #444",
                borderRadius: "12px",
                padding: "12px 5px",
                fontSize: "18px",
                fontWeight: "500",
                margin: "8px",
                width: "100%",
                pointerEvents: selectedOption ? "none" : "",
                backgroundColor: selectedOption
                  ? option === question.answer
                    ? "#4CAF50"
                    : selectedOption === option
                    ? "#E63946"
                    : "#333"
                  : "#333",
                color:
                  selectedOption && (option === question.answer || selectedOption === option)
                    ? "white"
                    : "#E0E0E0",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                textAlign: "start",
                boxShadow: selectedOption
                  ? option === question.answer
                    ? "0px 0px 10px #4CAF50"
                    : selectedOption === option
                    ? "0px 0px 10px #E63946"
                    : "none"
                  : "none",
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {option}
            </div>
          </div>
        ))}
      </div>

      {/* Modal with Fade Animation */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: fade ? 1 : 0,
            visibility: fade ? "visible" : "hidden",
            transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              backgroundColor: isCorrect ? "rgba(46, 125, 50, 0.9)" : "rgba(211, 47, 47, 0.9)",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
              width: "350px",
              boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
              transform: fade ? "scale(1)" : "scale(0.9)",
              transition: "transform 0.3s ease-in-out",
              fontFamily: "'Poppins', sans-serif",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Animated Icon */}
            <div
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#fff",
                animation: "scaleUp 0.4s ease-in-out",
              }}
            >
              {isCorrect ? "✔" : "✖"}
            </div>

            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: "15px",
              }}
            >
              {message}
            </p>

            <button
              onClick={closeModal}
              style={{
                marginTop: "10px",
                padding: "12px 25px",
                border: "none",
                backgroundColor: isCorrect ? "#388E3C" : "#D32F2F",
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "background 0.3s ease-in-out",
                boxShadow: "0px 3px 10px rgba(255, 255, 255, 0.2)",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = isCorrect ? "#2E7D32" : "#B71C1C")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = isCorrect ? "#388E3C" : "#D32F2F")
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RiddleQuestion;
