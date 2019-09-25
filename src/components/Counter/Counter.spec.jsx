import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Counter } from "../Counter/Counter";

describe("Counter", () => {
  it("Increments counter after clicking a button", () => {
    const { getByTestId } = render(<Counter />);

    const $title = getByTestId("title");
    const $button = getByTestId("button");

    expect($title.textContent).toEqual("0");

    fireEvent.click($button);

    expect($title.textContent).toEqual("1");
  });
});
