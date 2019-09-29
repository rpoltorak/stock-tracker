export function createQuery(params) {
  const keys = Object.keys(params);

  if (!keys.length) {
    return "";
  }

  return "?" + keys.map(key => `${key}=${params[key]}`).join("&");
}
