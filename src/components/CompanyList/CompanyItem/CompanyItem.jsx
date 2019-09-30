import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ActionTypes, Store } from "../../../store";
import { useRequest } from "../../../hooks";
import { getQuote, getDetails, removeSuffix } from "../../../services";

CompanyItem.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export function CompanyItem({ symbol }) {
  const {
    state: { companies },
  } = useContext(Store);
  const { dispatch } = useContext(Store);
  const { name } = companies.byId[symbol];
  const [{ data: quote }] = useRequest(getQuote(symbol));
  const [{ data: details }] = useRequest(getDetails(removeSuffix(name)));

  return (
    <li>
      <span>
        {symbol}: {name}
      </span>
      <span>{JSON.stringify(quote)}</span>
      <span>
        {JSON.stringify(details && details.length ? details[0] : null)}
      </span>
      <a
        href="#"
        onClick={() =>
          dispatch({ type: ActionTypes.REMOVE_COMPANY, payload: symbol })
        }
      >
        remove
      </a>
    </li>
  );
}
