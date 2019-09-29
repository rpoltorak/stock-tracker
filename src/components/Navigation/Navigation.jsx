import React from "react";
import { Link } from "@reach/router";

const Navigation = () => (
  <ul>
    <li>
      <Link to="/">Companies</Link>
    </li>
    <li>
      <Link to="/new">New Track</Link>
    </li>
  </ul>
);

export { Navigation };
