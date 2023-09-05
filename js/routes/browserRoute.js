import { renderRoutes } from './renderRoutes.js'

export function browserRoute(routes, selector) {
    renderRoutes(selector, routes)
    addEventListener('hashchange', () => renderRoutes(selector, routes));
}