import { normalizeData } from "./companies";

describe("Companies Service", () => {
  describe("normalizeData()", () => {
    test("returns collection with converted keys for search results", () => {
      const normalizedCollection = normalizeData({
        "Test values": [
          {
            "1. symbol": "test",
            "2. name": "test",
            "3. type": "test",
          },
        ],
      });

      expect(normalizedCollection).toEqual({
        testValues: [
          {
            symbol: "test",
            name: "test",
            type: "test",
          },
        ],
      });
    });

    test("returns collection with converted keys for getQuote results", () => {
      const normalizedData = normalizeData({
        "Test values": [
          {
            "01. symbol": "test",
            "02. open": "test",
            "03. high": "test",
            "04. low": "test",
            "05. price": "test",
            "07. latest trading day": "test",
          },
        ],
      });

      expect(normalizedData).toEqual({
        testValues: [
          {
            symbol: "test",
            open: "test",
            high: "test",
            low: "test",
            price: "test",
            latestTradingDay: "test",
          },
        ],
      });
    });
  });
});
