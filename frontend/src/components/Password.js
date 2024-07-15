import React, { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";

const Password = () => {
  const [text, setText] = useState("");
  const [rules, setRules] = useState([]);
  const [failedRule, setFailedRule] = useState(null);

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
      setRules(data.rules);
      setFailedRule(data.failedRule);
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
      <div className="mt-4 w-full max-w-md">
        {rules.map((rule, index) => (
          <div
            key={rule.id}
            className={`mt-2 p-2 rounded text-lg ${
              failedRule && failedRule.id === rule.id
                ? "bg-red-100 text-red-500"
                : "bg-green-100 text-green-500"
            }`}
          >
            {`Rule ${rule.id}: ${rule.description}`}
          </div>
        ))}
      </div>
      {failedRule && (
        <div className="mt-4 text-2xl text-red-500">
          {`Failed Rule: ${failedRule.description}`}
        </div>
      )}
    </div>
  );
};

export default Password;
