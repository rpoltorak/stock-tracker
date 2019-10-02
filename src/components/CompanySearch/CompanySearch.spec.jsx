import React from "react";
import axios from "axios";
import { render, fireEvent, wait, cleanup } from "@testing-library/react";
import { Store } from "../../store";
import { CompanySearch } from "./CompanySearch";

const setup = () => {
  const utils = render(<CompanySearch />);
  const input = utils.getByTestId("search");
  return {
    input,
    ...utils,
  };
};

const exampleData = [
  {
    "1. symbol": "GOOG",
    "2. name": "Alphabet Inc.",
    "3. type": "Equity",
    "4. region": "United States",
    "5. marketOpen": "09:30",
    "6. marketClose": "16:00",
    "7. timezone": "UTC-04",
    "8. currency": "USD",
    "9. matchScore": "1.0000",
  },
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

afterEach(cleanup);

describe("CompanySearch", () => {
  test("renders properly on idle state", () => {
    const { getByText, input } = setup();

    expect(getByText("Company symbol")).toBeTruthy();
    expect(input).toBeTruthy();
  });

  test("makes an search api call after input change", async () => {
    axios.mockResolvedValue({ data: { bestMatches: exampleData } });

    const { input } = setup();

    fireEvent.change(input, { target: { value: "GOOG" } });

    await wait(() => {
      expect(axios).toHaveBeenCalled();
    });
  });

  test("renders the result after input change", async () => {
    const { input, container } = setup();

    fireEvent.change(input, { target: { value: "GOOG" } });

    await wait(() => {
      expect(container.querySelector(".list-group-item")).toBeTruthy();
      expect(container.querySelectorAll(".list-group-item").length).toEqual(2);
    });
  });

  test("dispatches an action after clicking track button", async () => {
    axios.mockResolvedValue({ data: { bestMatches: exampleData } });

    const state = {
      companies: {
        byId: {},
        ids: [],
      },
    };
    const dispatch = jest.fn();

    const { getByTestId, getByText, container } = render(
      <Store.Provider value={{ state, dispatch }}>
        <CompanySearch />
      </Store.Provider>,
    );

    fireEvent.change(getByTestId("search"), { target: { value: "GOOG" } });

    await wait(() => {
      fireEvent.click(container.querySelectorAll(".list-group-item")[0]);
      fireEvent.click(getByText("Track"));
    });

    expect(dispatch).toHaveBeenCalled();
  });
});
