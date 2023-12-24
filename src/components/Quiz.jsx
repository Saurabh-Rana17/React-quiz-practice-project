import React, { useCallback } from "react";
import { useState } from "react";
import QUESTION from "../question";
import quizCompleteIcon from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  // userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTION.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setAnswerState("answered");

    setUserAnswers((prev) => {
      const arr = [...prev, selectedAnswer];
      return arr;
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTION[activeQuestionIndex].answers[0]) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }
      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    }, 1000);
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
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleTimeout}
        />
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <Answers
          answers={QUESTION[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
