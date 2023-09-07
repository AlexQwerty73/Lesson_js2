const baseUrl = 'https://swapi.dev/api/';
const headers = {
  'Content-type': 'Application/json',
};

export const getResources = async () => {
  const res = await fetch(baseUrl, { headers });
  const resources = await res.json();

  return resources;
}

export const getData = async (resource = '') => {
  const res = await fetch(baseUrl + resource, { headers });;
  const data = await res.json();

  return data;
}