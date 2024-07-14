import React, { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";

const Password = () => {
  const [text, setText] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResponseMessage(data.result);
      setIsCorrect(data.isCorrect);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#022B42] min-h-screen items-center justify-center">
      <h1 className="py-14 text-6xl  font-bold text-white text-center">
        Welcome to Password Game
      </h1>
      <div className="px-40">
        <TextBox value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="pt-8 text-center">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      {responseMessage && (
        <div className={`mt-4 text-2xl text-center ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default Password;
