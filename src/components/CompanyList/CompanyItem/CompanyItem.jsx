import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ActionTypes, Store } from "../../../store";
import { useRequest } from "../../../hooks";
import { getQuote, getDetails, removeSuffix } from "../../../services";
import { CompanyLogo } from "./CompanyLogo";
import { CompanyInfo } from "./CompanyInfo";
import { CompanyQuote } from "./CompanyQuote";

CompanyItem.propTypes = {
  symbol: PropTypes.string.isRequired,
};

export function CompanyItem({ symbol }) {
  const {
    state: { companies },
  } = useContext(Store);
  const { dispatch } = useContext(Store);
  const company = companies.byId[symbol];
  const [{ data: quote }] = useRequest(getQuote(symbol));
  const [{ data: detailsList }] = useRequest(
    getDetails(removeSuffix(company.name)),
  );
  const details = detailsList ? detailsList[0] : null;

  return quote && details ? (
    <div>
      <CompanyLogo url={details.logo} />
      <CompanyInfo company={company} domain={details.domain} />
      <CompanyQuote
        currency={company.currency}
        quote={quote.globalQuote}
      ></CompanyQuote>
      <a
        href="#"
        onClick={() =>
          dispatch({ type: ActionTypes.REMOVE_COMPANY, payload: symbol })
        }
      >
        remove
      </a>
    </div>
  ) : (
    <div>loading...</div>
  );
}
