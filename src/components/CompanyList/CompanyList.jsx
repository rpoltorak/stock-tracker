import React, { useContext } from "react";
import { Link } from "@reach/router";
import { Store } from "../../store";
import { CompanyItem } from "./CompanyItem";

export function CompanyList() {
  const {
    state: { companies },
  } = useContext(Store);

  return companies.ids.length ? (
    companies.ids.map(symbol => (
      <CompanyItem key={symbol} symbol={symbol}></CompanyItem>
    ))
  ) : (
    <div>
      There are no companies yet.{" "}
      <Link to="/new">Track your first company.</Link>
    </div>
  );
}
