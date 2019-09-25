import React, { useState } from "react";
import styles from "./App.scss";

export function App() {
  const [counter, updateCounter] = useState(0);

  return (
    <div>
      <h1 data-testid="title" className={styles.title}>
        {counter}
      </h1>
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
