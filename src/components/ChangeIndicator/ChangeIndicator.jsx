import React from "react";
import PropTypes from "prop-types";

ChangeIndicator.propTypes = {
  change: PropTypes.string.isRequired,
  changePercent: PropTypes.string.isRequired,
};

export function ChangeIndicator({ change, changePercent }) {
  const isIncrease = Number(change) > 0;

  return (
    <span className="mx-2" style={{ color: isIncrease ? "green" : "red" }}>
      {change}({changePercent})
    </span>
  );
}
