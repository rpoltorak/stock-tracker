import mapKeys from "lodash.mapkeys";
import mapValues from "lodash.mapvalues";
import camelCase from "lodash.camelcase";
import { get } from "./request";

const quoteUrl = "https://www.alphavantage.co/query";
const detailsUrl = "https://autocomplete.clearbit.com/v1/companies/suggest";

export function search(query) {
  return get(quoteUrl, {
    keywords: query,
    function: "SYMBOL_SEARCH",
    apikey: API_KEY,
  });
}

export function getQuote(symbol) {
  return get(quoteUrl, {
    symbol,
    function: "GLOBAL_QUOTE",
    apikey: API_KEY,
  });
}

export function getDetails(name) {
  return get(detailsUrl, {
    query: name,
  });
}

// formats keys of api response to more human readable objects
export function normalizeData(data) {
  return mapValues(mapKeys(data, normalizeKey), value =>
    Array.isArray(value)
      ? value.map(item => mapKeys(item, normalizeKey))
      : mapKeys(value, normalizeKey),
  );
}

export function normalizeKey(value, key) {
  return camelCase(key.replace(/[0-9]+. /, ""));
}

export function removeSuffix(name) {
  return name.replace(/ (Inc|Ltd|Co|L.P|LLC).+/, "");
}
