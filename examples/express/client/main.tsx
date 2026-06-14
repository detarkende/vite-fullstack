import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [count, setCount] = React.useState(0);
  const increase = () => setCount((c) => c + 1);
  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>increase</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
