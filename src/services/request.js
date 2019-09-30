export function get(url, params) {
  return {
    method: "GET",
    url: url + createQuery(params),
  };
}

export function post(url, params) {
  return {
    method: "POST",
    url,
    data: createQuery(params),
  };
}

export function createQuery(params) {
  const keys = Object.keys(params);

  if (!keys.length) {
    return "";
  }

  return "?" + keys.map(key => `${key}=${params[key]}`).join("&");
}
