import React from "react";
import PropTypes from "prop-types";

CompanyInfo.propTypes = {
  domain: PropTypes.string.isRequired,
  company: PropTypes.shape({
    name: PropTypes.string,
    symbol: PropTypes.string,
    region: PropTypes.string,
    marketOpen: PropTypes.string,
    marketClose: PropTypes.string,
    timezone: PropTypes.string,
  }).isRequired,
};

export function CompanyInfo({ company, domain }) {
  return (
    <div>
      <div>
        <strong>{name}</strong> {company.symbol} {domain}
      </div>
      <div>
        {company.region} {company.marketOpen}-{company.marketClose}{" "}
        {company.timezone}
      </div>
    </div>
  );
}
