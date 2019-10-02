import React from "react";
import axios from "axios";
import { render, wait, cleanup } from "@testing-library/react";
import { Store } from "../../store";
import { CompanyList } from "./CompanyList";

jest.mock("axios");

const exampleData = [
  {
    "1. symbol": "GOOGL",
    "2. name": "Alphabet Inc.",
    "3. type": "Equity",
    "4. region": "United States",
    "5. marketOpen": "09:30",
    "6. marketClose": "16:00",
    "7. timezone": "UTC-04",
    "8. currency": "USD",
    "9. matchScore": "0.8889",
  },
];

const setupWithState = () => {
  const state = {
    companies: {
      byId: {
        GOOGL: {
          symbol: "GOOGL.ARG",
          name: "Alphabet Inc.",
          type: "Equity",
          region: "Argentina",
          marketOpen: "09:30",
          marketClose: "6:00",
          timezone: "UTC-04",
          currency: "USD",
          matchScore: "0.8889",
        },
      },
      ids: ["GOOGL"],
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
  test("matches the snapshot", async () => {
    axios.mockResolvedValue({ data: { bestMatches: exampleData } });

    const component = setupWithState();

    await wait(() => {
      expect(component).toMatchSnapshot();
    });
  });

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
      expect(axios).toHaveBeenCalledTimes(2);
    });
  });
});
