import React from "react";
import PropTypes from "prop-types";
import { Figure } from "react-bootstrap";

CompanyLogo.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export function CompanyLogo({ url, name }) {
  return url ? (
    <img width={64} height={64} className="mr-3" alt={name} src={url} />
  ) : (
    <Figure>
      <Figure.Image
        width={64}
        height={64}
        alt={name}
        src="https://via.placeholder.com/64"
        className="mr-3"
      />
    </Figure>
  );
}
