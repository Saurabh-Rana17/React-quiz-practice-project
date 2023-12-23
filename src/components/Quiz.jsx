import React, { useCallback } from "react";
import { useState } from "react";
import QUESTION from "../question";
import quizCompleteIcon from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTION.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prev) => {
      const arr = [...prev, selectedAnswer];
      return arr;
    });
  },
  []);

  const handleTimeout = useCallback(function handleTimeout() {
    setUserAnswers((prev) => {
      const arr = [...prev, null];
      return arr;
    });
  }, []);

  if (quizIsComplete) {
    return (
      <>
        <div id="summary">
          <img src={quizCompleteIcon} alt="Trophy Icon" />
          <h2>Quiz Completed!</h2>
        </div>
      </>
    );
  }

  const shuffledAnswers = [...QUESTION[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={10000} onTimeout={handleTimeout} />
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
