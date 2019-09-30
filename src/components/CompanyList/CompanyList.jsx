import React, { useContext } from "react";
import { Store } from "../../store";
import { CompanyItem } from "./CompanyItem";

export function CompanyList() {
  const {
    state: { companies },
  } = useContext(Store);

  return (
    <ul>
      {companies.ids.map(symbol => (
        <CompanyItem key={symbol} symbol={symbol}></CompanyItem>
      ))}
    </ul>
  );
}
