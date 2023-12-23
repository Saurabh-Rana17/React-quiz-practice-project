import React, { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 100);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  return (
    <div>
      <progress id="question-time" value={timeRemaining} max={timeout} />
    </div>
  );
}
