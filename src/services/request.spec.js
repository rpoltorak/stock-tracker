import { createQuery } from "./request";

describe("Request Service", () => {
  describe("createRequest()", () => {
    test("returns empty string for empty object", () => {
      const params = {};

      const result = createQuery(params);

      expect(result).toEqual("");
    });

    test("returns proper query string for one param", () => {
      const params = {
        function: "SYMBOL_SEARCH",
      };

      const result = createQuery(params);

      expect(result).toEqual(`?function=SYMBOL_SEARCH`);
    });

    test("returns proper query string for multiple params", () => {
      const params = {
        function: "SYMBOL_SEARCH",
        keywords: "ABC",
        apiKey: "1234",
      };

      const result = createQuery(params);

      expect(result).toEqual(
        `?function=SYMBOL_SEARCH&keywords=ABC&apiKey=1234`,
      );
    });
  });
});
