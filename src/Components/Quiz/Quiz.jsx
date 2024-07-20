import React, { useRef, useEffect, useState } from 'react'
import './Quiz.css'
//import { data } from '../../assets/data';
import { getRandomItems } from '../../RandomItems';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    const randomQuestions = getRandomItems(5); // Get 5 random questions
    setQuestions(randomQuestions);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const checkAns = (e, ans) => {
    if (!lock) {
      if (currentQuestion.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[currentQuestion.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (currentQuestionIndex === questions.length - 1) {
        setResult(true);
        return;
      }
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setLock(false);
      optionArray.forEach(option => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    const randomQuestions = getRandomItems(5); // Reset with new random questions
    setQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>You Scored {score} out of {questions.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>{currentQuestionIndex + 1}. {currentQuestion.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{currentQuestion.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{currentQuestion.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{currentQuestion.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{currentQuestion.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{currentQuestionIndex + 1} of {questions.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
