import React from "react";
import { render } from "@testing-library/react";
import { CompanyInfo } from "./CompanyInfo";

describe("CompanyInfo", () => {
  test("matches the snapshot", () => {
    const props = {
      domain: "xyz.com",
      company: {
        symbol: "GOOGL.ARG",
        name: "Alphabet Inc.",
        region: "Argentina",
        marketOpen: "11:00",
        marketClose: "17:00",
        timezone: "UTC-03",
      },
    };
    const component = render(<CompanyInfo {...props} />);

    expect(component).toMatchSnapshot();
  });
});
