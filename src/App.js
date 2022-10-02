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
      <h1>Hello CodeSandbox {count}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
