import {
  pageHome,
  page404,
  pageAbout,
  pagePosts,
  pageContacts,
  pageSinglePost,
} from './../components/pages.js';

export const routes = [
  { path: '/', component: pageHome },
  { path: '/posts', component: pagePosts },
  { path: '/**/:id', component: pageSinglePost },
  { path: '/about', component: pageAbout },
  { path: '/contacts', component: pageContacts },
  { path: '**', component: page404 },
];

// renderRoutesList(routes, '.list');
// function renderRoutesList(routes, selector) {
//   const parEl = document.querySelector(selector);
// }