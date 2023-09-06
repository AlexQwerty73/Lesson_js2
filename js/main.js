import { routes } from "./routes/routes.js";
import { browserRoute } from "./routes/browserRoute.js";
import { renderNavigationLinks } from "./render/navigation.js";

const pageNames = ['Home', 'Posts', 'About', 'Contacts'];

renderNavigationLinks(pageNames, '.list');
browserRoute(routes, '.layout');


