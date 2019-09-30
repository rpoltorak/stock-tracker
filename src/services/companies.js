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

// formats keys of api response to more human readable objects
export function normalizeData(data) {
  return mapValues(mapKeys(data, normalizeKey), value =>
    Array.isArray(value)
      ? value.map(item => mapKeys(item, normalizeKey))
      : mapKeys(value, normalizeKey),
  );
}

function normalizeKey(value, key) {
  return camelCase(key.replace(/[0-9]+. /, ""));
}
