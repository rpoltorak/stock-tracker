import React, { Fragment, useState, useContext, useEffect } from "react";
import { ActionTypes, Store } from "../../store";
import { useRequest } from "../../hooks";
import { search as searchCompany } from "../../services";
import { useDebounce } from "../../hooks";

export function SymbolSearch() {
  const { dispatch } = useContext(Store);
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, setParams, setData] = useRequest(
    searchCompany(query),
    {
      bestMatches: [],
    },
  );
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setParams(searchCompany(debouncedQuery));
    }
  }, [debouncedQuery]);

  return (
    <Fragment>
      <div>Company symbol</div>
      <form
        onSubmit={event => {
          dispatch({ type: ActionTypes.ADD_SYMBOL, payload: query });
          setQuery("");
          setData({
            bestMatches: [],
          });
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          data-testid="search"
        />
        <button type="submit">Track</button>
      </form>
      {isError && <div>Error occured</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.bestMatches &&
            data.bestMatches.map(item => (
              <li key={item.symbol}>
                <a href="#" onClick={() => setQuery(item.symbol)}>
                  {item.symbol}: {item.name}
                </a>
              </li>
            ))}
        </ul>
      )}
      <div>
        Provide the stock exchange symbol of a company you want to track
      </div>
    </Fragment>
  );
}
