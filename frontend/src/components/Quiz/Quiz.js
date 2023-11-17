
// Quiz.js
import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../../services/api';
import Question from './Question';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    getQuestions();
  }, []);

  const handleQuestionSelection = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Reset selected option when moving to the next question
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[prevIndex+1].selectedOption = null;
        return updatedQuestions;
      });
      return Math.min(prevIndex + 1, questions.length - 1);
    });
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Reset selected option when moving to the previous question
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[prevIndex].selectedOption = null;
        return updatedQuestions;
      });
      return Math.max(prevIndex - 1, 0);
    });
  };

  const handleAnswer = (selectedOption) => {
    // Handle the submitted answer, you can send it to the server, etc.
    console.log('Answer submitted:', selectedOption);
  };

  const handleLogout = () => {
    // Add any additional logic you need before logging out (e.g., clearing local storage, etc.)
    navigate('/login');
  };

  return (
    <div>
    
      <h1 className="welcome-text">Welcome to Neeraj's Brain Teasers</h1>

      <div className="logout-container">
          <Link to="/login" className="logout-button">
            Logout
          </Link>
        </div>

      <div className="quiz-container">
      <div  className="sidebar-container">
        <Sidebar
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          handleQuestionSelection={handleQuestionSelection}
        />
        {questions.length > 0 && (
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default Quiz;






