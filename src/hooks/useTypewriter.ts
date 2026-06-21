import { useState, useEffect } from "react";

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    let index = 0;
    let intervalId: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < text.length) {
          index++;
          setDisplayed(text.slice(0, index));
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
