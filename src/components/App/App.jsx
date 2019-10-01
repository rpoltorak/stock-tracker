import React, { useContext, useReducer } from "react";
import { Router } from "@reach/router";
import { Container } from "react-bootstrap";

import { Store, reducer } from "../../store";
import { usePersistedContext, usePersistedReducer } from "../../hooks";

import { Navigation } from "../Navigation";
import { TrackPage, CompaniesPage } from "../../pages";

import "bootstrap/dist/css/bootstrap.min.css";

export function App() {
  const globalStore = usePersistedContext(useContext(Store), "state");

  const [state, dispatch] = usePersistedReducer(
    useReducer(reducer, globalStore),
    "state",
  );

  return (
    <Store.Provider value={{ state, dispatch }}>
      <Container>
        <Navigation />
        <Router>
          <CompaniesPage path="/" />
          <TrackPage path="/new" />
        </Router>
      </Container>
    </Store.Provider>
  );
}

export default App;
