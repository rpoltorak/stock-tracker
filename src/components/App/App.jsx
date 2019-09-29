import React, { useContext, useReducer } from "react";
import { Router } from "@reach/router";

import { Store, reducer } from "../../store";
import { usePersistedContext, usePersistedReducer } from "../../hooks";

import { Navigation } from "../Navigation";
import { TrackPage } from "../../pages";

export function App() {
  const globalStore = usePersistedContext(useContext(Store), "state");

  const [state, dispatch] = usePersistedReducer(useReducer(reducer, globalStore), "state");

  return (
    <Store.Provider value={{ state, dispatch }}>
      <Navigation />
      <Router>
        <TrackPage path="/" />
      </Router>
    </Store.Provider>
  );
}

export default App;
