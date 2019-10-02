import React from "react";
import { render } from "@testing-library/react";
import { CompanyResults } from "./CompanyResults";

describe("CompanyResults", () => {
  test("matches the snapshot", () => {
    const results = [
      {
        symbol: "GOOG",
        name: "Alphabet Inc.",
        type: "Equity",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-04",
        currency: "USD",
        matchScore: "1.0000",
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        type: "Equity",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-04",
        currency: "USD",
        matchScore: "0.8889",
      },
    ];
    const component = render(
      <CompanyResults results={results} action={jest.fn()} />,
    );

    expect(component).toMatchSnapshot();
  });
});
