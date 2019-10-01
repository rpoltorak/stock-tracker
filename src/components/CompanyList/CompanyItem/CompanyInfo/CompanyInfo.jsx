import React, { Fragment } from "react";
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
    <Fragment>
      <div>
        <span className="font-weight-bold mr-2">{company.name}</span>{" "}
        <span className="small mr-2">{company.symbol}</span>
        <span className="small">{domain}</span>
      </div>
      <div>
        {company.region} {company.marketOpen}-{company.marketClose}{" "}
        {company.timezone}
      </div>
    </Fragment>
  );
}
