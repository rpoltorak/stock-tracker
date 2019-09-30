import React, { useContext } from "react";
import { Store } from "../../store";
import { CompanyItem } from "./CompanyItem";

export function CompanyList() {
  const { state } = useContext(Store);

  return (
    <ul>
      {state.symbols.map(symbol => (
        <CompanyItem key={symbol} symbol={symbol}></CompanyItem>
      ))}
    </ul>
  );
}
