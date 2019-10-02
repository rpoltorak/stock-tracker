import React from "react";
import { render } from "@testing-library/react";
import { CompanyLogo } from "./CompanyLogo";

describe("CompanyLogo", () => {
  test("matches the snapshot", () => {
    const component = render(
      <CompanyLogo
        url={"https://logo.clearbit.com/apple.com"}
        name={"Apple"}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
