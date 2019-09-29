import mapKeys from "lodash.mapkeys";
import { createQuery } from "./request";

const key = "4I99RWN85Z9G0022";

export function search(query) {
  if (!query) {
    return null;
  }

  return {
    method: "GET",
    url:
      "https://www.alphavantage.co/query" +
      createQuery({
        keywords: query,
        function: "SYMBOL_SEARCH",
        apikey: key,
      }),
  };
}

export function normalizeData(collection) {
  return collection.map(item => mapKeys(item, (value, key) => key.replace(/[0-9]. /, "")));
}
