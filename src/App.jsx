import React from "react";
import viteLogo from "/vite.svg";
import javascriptLogo from "/javascript.svg";

function App() {
  return (
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src={javascriptLogo} className="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello Vite!</h1>
      <div className="card">
        <button id="counter" type="button">Click me</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite logo to learn more
      </p>
    </div>
  );
}

export default App;
