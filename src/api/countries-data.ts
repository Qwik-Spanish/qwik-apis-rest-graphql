const API_URL_GRAPHQL = 'https://countries.trevorblades.com/';

export const countriesGraphQLAPI = async (
  body: { query: string; variables?: string },
  controller?: AbortController
): Promise<Array<any>> => {
  const resp = await fetch(API_URL_GRAPHQL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: controller?.signal,
  });

  console.log('FETCH resolved');
  const {data } = await resp.json();
  console.log(data)
  return data || Promise.reject(data);
};
