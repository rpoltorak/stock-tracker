import isEmpty from "lodash.isEmpty";
import mapKeys from "lodash.mapkeys";
import mapValues from "lodash.mapvalues";
import camelCase from "lodash.camelcase";
import { createQuery } from "./request";

const url = "https://www.alphavantage.co/query";
const key = "4I99RWN85Z9G0022";

export function search(query) {
  if (!query) {
    return null;
  }

  return {
    method: "GET",
    url:
      url +
      createQuery({
        keywords: query,
        function: "SYMBOL_SEARCH",
        apikey: key,
      }),
  };
}

export function getQuote(symbol) {
  if (!symbol) {
    return null;
  }

  return {
    method: "GET",
    url:
      url +
      createQuery({
        symbol,
        function: "GLOBAL_QUOTE",
        apikey: key,
      }),
  };
}

export function normalizeData(collection) {
  return collection.map(item =>
    mapKeys(item, (value, key) => key.replace(/[0-9]. /, "")),
  );
}
