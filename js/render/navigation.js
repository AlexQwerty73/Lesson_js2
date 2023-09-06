export function renderNavigationLinks(pageNames, selector) {
    const parEl = document.querySelector(selector);
    const html = pageNames.map(name => `<li><a href="#/${name == 'Home' ? '' : name.toLowerCase()}">${name}</a></li>`).join('');

    parEl.innerHTML = html;
}