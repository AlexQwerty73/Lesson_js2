import {
    page404,
    pageAbout,
    pageHome,
    pagePost
} from '../components/pages.js';

export const routes = [
    { path: '/', component: pageHome },
    { path: '/posts', component: pagePost },
    { path: '/about', component: pageAbout },
    { path: '**', component: page404 },
];

