import React from "react";
import { render } from "@testing-library/react";
import { CompanyQuote } from "./CompanyQuote";

describe("CompanyQuote", () => {
  test("matches the snapshot", () => {
    const props = {
      currency: "USD",
      quote: {
        price: "312.93",
        change: "0.6200",
        changePercent: "0.2768%",
        latestTradingDay: "2019-10-01",
      },
    };
    const component = render(<CompanyQuote {...props} />);

    expect(component).toMatchSnapshot();
  });
});
