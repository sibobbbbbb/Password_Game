import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      className="bg-[#006494] text-white px-4 py-2 rounded hover:bg-[#129bdb]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;