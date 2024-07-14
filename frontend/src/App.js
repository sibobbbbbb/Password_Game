import React, { useState } from "react";
import Password from "./components/Password";

const App = () => {
  const [text, setText] = useState("");

  const handleClick = () => {
    alert(`Input Value: ${text}`);
  };

  return (
    <div>
      <Password></Password>
    </div>
  );
};
export default App;
