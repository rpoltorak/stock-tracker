import React from "react";
import { Router } from "@reach/router";
import Counter from "../Counter/Counter";

const Home = () => <h1>Home</h1>;

export function App() {
  return (
    <Router>
      <Home path="/" />
      <Counter path="/counter" />
    </Router>
  );
}

export default App;
