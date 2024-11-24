// DummyComponent.jsx
import React, { useState } from "react";

const Test1 = () => {
  const [message, setMessage] = useState("Hello, world!");

  const changeMessage = () => {
    setMessage("You clicked the button!");
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={changeMessage}>Click Me</button>
    </div>
  );
};

export default Test1;