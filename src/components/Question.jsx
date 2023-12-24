import React from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  onTimeout,
  selectedAnswer,
  answerState,
}) {
  return (
    <>
      <div id="question">
        <QuestionTimer timeout={10000} onTimeout={onTimeout} />
        <h2>{questionText}</h2>
        <Answers
          answers={answers}
          selectedAnswer={selectedAnswer}
          answerState={answerState}
          onSelect={onSelectAnswer}
        />
      </div>
    </>
  );
}
