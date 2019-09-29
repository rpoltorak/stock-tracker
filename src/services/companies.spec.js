import { normalizeData } from "./companies";

describe("Companies Service", () => {
  describe("normalizeData()", () => {
    test("returns collection with converted keys", () => {
      const normalizedCollection = normalizeData([
        {
          "1. symbol": "test",
          "2. name": "test",
          "3. type": "test",
        },
      ]);

      expect(normalizedCollection).toEqual([
        {
          symbol: "test",
          name: "test",
          type: "test",
        },
      ]);
    });
  });
});
