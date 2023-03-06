const API_URL = 'https://ergast.com/api/f1/';

// https://ergast.com/api/f1/<AÑO>.json
export const ergastF1ChampionshipRaceListAPI = async (
  year: string,
  controller?: AbortController
): Promise<Array<any>> => {
  const endPoint = `${year}.json`;

  const url = `${API_URL}${endPoint}`;
  console.log('Vamos a obtener datos desde =====>', url);
  const data = await fetch(url, {
    method: 'GET',
    signal: controller?.signal,
  });
  console.log('FETCH resolved');
  const json: Array<any> = (await data.json())['MRData']['RaceTable']['Races'];
  return Array.isArray(json) ? json : Promise.reject(json);
};
