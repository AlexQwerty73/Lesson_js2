const doc = document;
import { getResources } from "./API/api.js";
import { baseUrl } from "./API/api.js";

let resources = null;

renderResource()

async function renderResource() {
    const resourcesHtmlEl = doc.querySelector('.resources');
    resources = !resources ? await getResources() : resources;

    const resourcesEls =
        Object.keys(resources)
            .map((resource) => {
                return `<li class="resource btn">
                    <a href="#/${resource}/">
                        ${resource.charAt(0).toUpperCase() + resource.slice(1)}
                    </a>
                </li>`})
            .join('');

    resourcesHtmlEl.innerHTML = resourcesEls;

    addEventListener('hashchange', () => {
        const resourceLinks = resourcesHtmlEl.querySelectorAll('.resources li a');
        resourceLinks.forEach((link) => {
            link.classList.remove('active');
        });
        //.classList.add('active');

        //    const url = baseUrl + hash.slice(1);
        //    console.log(url);

    });

    console.log(resources);
}