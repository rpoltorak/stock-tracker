import React from "react";
import axios from "axios";
import { render, fireEvent, wait } from "@testing-library/react";
import { Store } from "../../store";
import { SymbolSearch } from "./SymbolSearch";

const setup = () => {
  const utils = render(<SymbolSearch />);
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

const renderWithStore = (state, dispatch) =>
  render(
    <Store.Provider value={{ state, dispatch }}>
      <SymbolSearch />
    </Store.Provider>,
  );

jest.mock("axios");

describe("SymbolSearch", () => {
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
      expect(container.querySelector("a")).toBeTruthy();
      expect(container.querySelectorAll("a").length).toEqual(2);
    });
  });

  // test("saves tracked symbol to context", async () => {
  //   const dispatch = jest.fn();

  //   const { input, getByText } = renderWithStore(undefined, dispatch);

  //   fireEvent.change(input, { target: { value: "GOOG" } });

  //   fireEvent.click(getByText("Track"));

  //   expect(dispatch).toHaveBeenCalled();
  // });
});
