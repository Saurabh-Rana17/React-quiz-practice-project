import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTION from "../question";

export default function Question({ onTimeout, index, onSelectAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTION[index].answers[0],
      });
    }, 1000);
    setTimeout(() => {
      onSelectAnswer(answer);
    }, 2000);
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <>
      <div id="question">
        <QuestionTimer timeout={10000} onTimeout={onTimeout} />
        <h2>{QUESTION[index].text}</h2>
        <Answers
          answers={QUESTION[index].answers}
          selectedAnswer={answer.selectedAnswer}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </>
  );
}
