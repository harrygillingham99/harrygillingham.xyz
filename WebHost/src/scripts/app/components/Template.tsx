import React, { useState } from "react";

export const Template: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  return (
    <>
      <p>This is a .NET 6 SPA Template {number}!</p>
      <button onClick={() => setNumber(number + 1)}>Increment</button>
    </>
  );
};
