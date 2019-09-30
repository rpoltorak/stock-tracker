import React from "react";
import PropTypes from "prop-types";

CompanyLogo.propTypes = {
  url: PropTypes.string,
};

export function CompanyLogo({ url }) {
  return <div>{url ? <img src={url} /> : <span>placeholder</span>}</div>;
}
