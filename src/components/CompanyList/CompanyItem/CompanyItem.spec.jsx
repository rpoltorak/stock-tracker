import React from "react";
import axios from "axios";
import { render, wait } from "@testing-library/react";
import { Store } from "../../../store";
import { CompanyItem } from "./CompanyItem";

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

jest.mock("axios");

describe("CompanyItem", () => {
  test("matches the snapshot", async () => {
    axios.mockResolvedValue({ data: { bestMatches: exampleData } });

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

    const component = render(
      <Store.Provider value={{ state }}>
        <CompanyItem symbol={"GOOGL"} />,
      </Store.Provider>,
    );

    await wait(() => {
      expect(component).toMatchSnapshot();
    });
  });
});
