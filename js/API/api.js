export const baseUrl = 'https://swapi.dev/api/';
const header = {
    'Content-Type': 'application/json'
}

export const getResources = async () => {
    const res = await fetch(baseUrl, {header});
    const resources = await res.json();
    return resources;
}