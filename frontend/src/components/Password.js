import React, { useState, useEffect } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import useBurningEffect from "./rule10/BurnEffect";

const Password = () => {
  const [text, setText] = useState("");
  const [rules, setRules] = useState([]);
  const [revealedRules, setRevealedRules] = useState([]);
  const [countRevealedRules, setCountRevealedRules] = useState(0);
  const [isBurning, setIsBurning] = useState(false);
  
  useBurningEffect(text, setText, isBurning, setIsBurning);
  useEffect(() => {
    if (text.trim().length > 0) {
      checkRules(text);
    }
  }, [text]);
  
  const checkRules = async (textToCheck) => {
    try {
      const response = await fetch("http://localhost:5000/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToCheck, countRevealedRules }),
      });
      const { results, countRevealedRules: newCount } = await response.json();
      setCountRevealedRules(newCount);
      setRules(results);
      const newRevealedRules = results.map((rule) => rule.id);
      setRevealedRules((prevRevealedRules) => [
        ...new Set([...prevRevealedRules, ...newRevealedRules]),
      ]);

      const rule10 = results.find((rule) => rule.id === 10);
      if (rule10 && rule10.isValid) {
        setIsBurning(true);
      } else {
        setIsBurning(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="bg-[#022B42] min-h-screen flex flex-col items-center justify-center">
      <h1 className="py-14 text-6xl font-bold text-white text-center">
        Welcome to Password Game
      </h1>
      <div className="px-40">
        <TextBox value={text} onChange={(e)=>setText(e.target.value) } />
      </div>
      {revealedRules.map((id) => {
        const rule = rules.find((r) => r.id === id);
        return (
          <div
            key={rule.id}
            className={`mt-4 text-2xl ${
              rule.isValid ? "text-green-500" : "text-red-500"
            }`}
          >
            {rule.description}
          </div>
        );
      })}
    </div>
  );
};

export default Password;
