import React, { Fragment, useState, useContext, useEffect } from "react";
import { ActionTypes, Store } from "../../store";
import { useRequest } from "../../hooks";
import { search as searchCompany } from "../../services";
import { useDebounce } from "../../hooks";

export function CompanySearch() {
  const { dispatch } = useContext(Store);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [{ data, isLoading, isError }, setRequestParams, setData] = useRequest(
    null,
    {
      bestMatches: [],
    },
  );
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setRequestParams(searchCompany(debouncedQuery));
    }
  }, [debouncedQuery]);

  return (
    <Fragment>
      <div>Company symbol</div>
      <form
        onSubmit={event => {
          dispatch({ type: ActionTypes.ADD_COMPANY, payload: selectedItem });
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
            data.bestMatches.map(company => (
              <li key={company.symbol}>
                <a
                  href="#"
                  onClick={() => {
                    setQuery(company.symbol);
                    setSelectedItem(company);
                  }}
                >
                  {company.symbol}: {company.name}
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
