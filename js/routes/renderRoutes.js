import { getHash } from './../utils/utils.js';

export function renderRoutes(selector, routes) {
  let route = getHash();
  let resource;

  const lastSlashIndex = route.lastIndexOf('/');
  const routeId = route.substring(lastSlashIndex + 1);

  if (route === '') {
    route = '/';
  }

  if (Number.isInteger(Number(routeId)) && route != '/') {
    resource = routes.find(r => r.path === '/**/:id');
    render(resource.component);
    return;
  }

  resource = routes.find(r => r.path === route);

  if (!resource) {
    resource = routes.find(r => r.path === '**');
  }

  render(resource.component);

  function render(component) {
    const layout = document.querySelector(selector);
    layout.innerHTML = component();
  }
}