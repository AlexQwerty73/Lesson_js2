import { getHash } from '../utils/utils.js';

export function renderRoutes(selector, routes) {
    const route = getHash();
    let resource;

    route == '' ? route = '/' : null;

    resource = routes.find(r => r.path == route);

    if (!resource) {
        resource = routes.find(r => r.path == '**')
    }

    render(resource.component);

    function render(component) {
        const layout = document.querySelector(selector);
        layout.innerHTML = component();
    }
}