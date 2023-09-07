import { renderRoutes } from "./renderRoutes.js";

export function browserRoute() {
  renderRoutes()
  addEventListener('hashchange', () => renderRoutes());
}