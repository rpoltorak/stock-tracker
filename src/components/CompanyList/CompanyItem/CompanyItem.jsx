import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Spinner, Media } from "react-bootstrap";
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
  const [showRemoval, setShowRemoval] = useState(false);
  const details = detailsList ? detailsList[0] : null;

  if (!quote || !details) {
    return (
      <div className="mb-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Media
      className="mb-2 position-relative"
      onMouseEnter={() => setShowRemoval(true)}
      onMouseLeave={() => setShowRemoval(false)}
    >
      <CompanyLogo url={details.logo} name={company.name} />
      <Media.Body>
        <CompanyInfo company={company} domain={details.domain} />
        <CompanyQuote
          currency={company.currency}
          quote={quote.globalQuote}
        ></CompanyQuote>
        {showRemoval && (
          <a
            href="#"
            className="position-absolute"
            style={{ top: 0, right: 0 }}
            onClick={() =>
              dispatch({ type: ActionTypes.REMOVE_COMPANY, payload: symbol })
            }
          >
            x
          </a>
        )}
      </Media.Body>
    </Media>
  );
}
