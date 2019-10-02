import React from "react";
import { render } from "@testing-library/react";
import { Store } from "../../store";
import { ChangeIndicator } from "./ChangeIndicator";

describe("ChangeIndicator", () => {
  test("matches the snapshot", () => {
    const state = {
      companies: {
        byId: {},
        ids: [],
      },
    };
    const component = render(
      <Store.Provider value={{ state }}>
        <ChangeIndicator change={"-0.01"} changePercent={"-0.5%"} />,
      </Store.Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
