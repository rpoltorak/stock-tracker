import React from "react";
import PropTypes from "prop-types";
import { ChangeIndicator } from "../../../ChangeIndicator";

CompanyQuote.propTypes = {
  currency: PropTypes.string.isRequired,
  quote: PropTypes.shape({
    price: PropTypes.string,
    change: PropTypes.string,
    changePercent: PropTypes.string,
    latestTradingDay: PropTypes.latestTradingDay,
  }).isRequired,
};

export function CompanyQuote({ quote, currency }) {
  return (
    <div>
      <strong>{quote.price}</strong> {currency}
      <ChangeIndicator
        change={quote.change}
        changePercent={quote.changePercent}
      />
      Closed: {quote.latestTradingDay}
      {closed}
    </div>
  );
}
