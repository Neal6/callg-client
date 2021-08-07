export const replaceParamUrl = (url: string, params: string[]) => {
  let replaceUrl = params.reduce((acc: string, cur: string) => {
    return acc.replace("$", cur);
  }, url);
  return replaceUrl;
};

export const formatQueryUrl = (url: string, query: any) => {
  return `${url}?${Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&")}`;
};

export const formatQuery = (query: any) => {
  return Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");
};

export const decodeQuery = (query: any) => {
  let objectQuery: any = {};
  let params = new URLSearchParams(query) as any;
  for (const [key, value] of params.entries()) {
    objectQuery[key] = value;
  }
  return objectQuery;
};
