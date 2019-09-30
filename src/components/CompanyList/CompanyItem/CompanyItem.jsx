import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { ActionTypes, Store } from "../../../store";
import { useRequest } from "../../../hooks";
import { getQuote } from "../../../services";

CompanyItem.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export function CompanyItem({ symbol }) {
  const {
    state: { companies },
  } = useContext(Store);
  const { dispatch } = useContext(Store);
  const [{ data, isLoading, isError }] = useRequest(getQuote(symbol), {
    globalQuote: {},
  });

  const { name } = companies.byId[symbol];

  return (
    <Fragment>
      {isError && <li>Error occured</li>}
      {isLoading ? (
        <li>Loading ...</li>
      ) : (
        <li>
          <span>
            {symbol}: {name}
          </span>
          <span>{JSON.stringify(data)}</span>
          <a
            href="#"
            onClick={() =>
              dispatch({ type: ActionTypes.REMOVE_SYMBOL, payload: symbol })
            }
          >
            remove
          </a>
        </li>
      )}
    </Fragment>
  );
}
