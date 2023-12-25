import React, { useCallback } from "react";
import { useState } from "react";
import QUESTION from "../question";
import quizCompleteIcon from "../assets/quiz-complete.png";
import Question from "./Question";

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

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onTimeout={handleTimeout}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
