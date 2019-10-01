import React from "react";
import axios from "axios";
import { render, wait, cleanup } from "@testing-library/react";
import { Store } from "../../store";
import { CompanyList } from "./CompanyList";

jest.mock("axios");

axios.mockImplementation(({ url }) => {
  switch (url) {
    case "https://www.alphavantage.co/query?symbol=GOOG&function=GLOBAL_QUOTE&apikey=4I99RWN85Z9G0022":
      return Promise.resolve({
        "Global quote": {
          "01. symbol": "AAPL",
          "02. open": "225.0000",
          "03. high": "228.2000",
          "04. low": "224.4200",
          "05. price": "224.9200",
          "06. volume": "13727323",
          "07. latest trading day": "2019-10-01",
          "08. previous close": "223.9700",
          "09. change": "0.9500",
          "10. change percent": "0.4242%",
        },
      });
    case "https://autocomplete.clearbit.com/v1/companies/suggest?query=Alphabet":
      return Promise.resolve([
        {
          domain: "apple.com",
          logo: "https://logo.clearbit.com/apple.com",
          name: "Apple",
        },
      ]);
    default:
      return null;
  }
});

const setupWithState = () => {
  const state = {
    companies: {
      byId: {
        GOOG: {
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
      },
      ids: ["GOOG"],
    },
  };

  render(
    <Store.Provider value={{ state }}>
      <CompanyList />
    </Store.Provider>,
  );
};

afterEach(() => {
  cleanup();
  axios.mockClear();
});

describe("CompanySearch", () => {
  test("renders properly on empty state", () => {
    const state = {
      companies: {
        byId: {},
        ids: [],
      },
    };

    const { getByText } = render(
      <Store.Provider value={{ state }}>
        <CompanyList />
      </Store.Provider>,
    );

    expect(getByText("There are no companies yet.")).toBeTruthy();
  });

  test("makes proper api calls for a list element", async () => {
    setupWithState();

    await wait(() => {
      expect(axios).toHaveBeenCalledWith({
        method: "GET",
        url:
          "https://www.alphavantage.co/query?symbol=GOOG&function=GLOBAL_QUOTE&apikey=4I99RWN85Z9G0022",
      });
      expect(axios).toHaveBeenCalledWith({
        method: "GET",
        url:
          "https://autocomplete.clearbit.com/v1/companies/suggest?query=Alphabet",
      });
      expect(axios).toHaveBeenCalledTimes(2);
    });
  });
});
