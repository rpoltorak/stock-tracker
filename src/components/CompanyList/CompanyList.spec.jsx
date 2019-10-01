import React from "react";
import axios from "axios";
import { render, wait, cleanup } from "@testing-library/react";
import { Store } from "../../store";
import { CompanyList } from "./CompanyList";

jest.mock("axios");

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
      expect(axios).toHaveBeenCalledTimes(2);
    });
  });
});
