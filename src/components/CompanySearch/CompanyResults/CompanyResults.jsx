import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

CompanyResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.func.isRequired,
};

export function CompanyResults({ results, action }) {
  return (
    <ListGroup className="mt-4">
      {results &&
        results.map(company => (
          <ListGroup.Item
            key={company.symbol}
            action
            onClick={() => action(company)}
          >
            {company.symbol}: {company.name}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
