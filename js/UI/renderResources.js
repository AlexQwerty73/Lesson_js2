const doc = document;
import { getResources } from './../API/api.js';
import { getHash } from './../utils/utils.js'

let resources = null;

export async function renderResources() {
  const resourcesHtmlEl = doc.querySelector('.resources');

  resourcesHtmlEl.innerHTML = '<h3>Loading rousources...</h3>'

  resources = !resources
    ? await getResources()
    : resources;

  render();

  function render() {
    const resourcesEls =
      Object.keys(resources)
        .map(resource => {
          const r = getHash().slice(1);
          const className = resource === r
            ? 'btn btn_active'
            : 'btn'

          const Resource = resource.charAt(0).toUpperCase() + resource.slice(1);
          return (
            `<li class="resource">
            <a class="${className}" href="#/${resource}">${Resource}</a>
          </li>`
          )
        }

        )
        .join('');

    resourcesHtmlEl.innerHTML = resourcesEls;
  }
}