import React, { useState } from "react";

export function App() {
  const [counter, updateCounter] = useState(0);

  return (
    <div>
      <h1 data-testid="title">{counter}</h1>
      <button
        data-testid="button"
        onClick={() => updateCounter(counter + 1)}
      >
        increment
      </button>
    </div>
  );
}

export default App;
