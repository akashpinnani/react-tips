import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); //stale closure
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="App">
      <h1>
        Simple counter example which logs stale closure captured value and
        displays correct count here -> {count}
      </h1>
    </div>
  );
}
