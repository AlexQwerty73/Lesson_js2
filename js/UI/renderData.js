import { getData } from "../API/api.js";
import { getHash } from "../utils/utils.js"

const doc = document;

let data = null;

export const renderData = async () => {
  const hash = getHash().replace('/', '');
  const parEl = doc.querySelector('.data')

  const lastIndex = location.href.lastIndexOf('/');
  const idElement = Number(location.href.slice(lastIndex + 1));
  let html;

  if (!hash) return;

  if (Number.isInteger(idElement)) {
    data = await getData(hash.slice(0, lastIndex) + hash.slice(lastIndex + 1));
    html = `<div class="btn data-item">${Object.keys(data).map(key => `<li>${key}: ${data[key]}</li>`)}</div>`;

    parEl.innerHTML = html;
    return;

  } else {
    data = await getData(hash);
  }

  console.log(data);
  html =
    Object.keys(data['results'])
      .map((key, i) => `<div class="btn data-item"><a href="#/${hash}/${i}">${Object.keys(data['results'][key])
        .map(k => `<li>${k}: ${data['results'][key][k]}</li>`)
        .join('')}</a></div>`)
      .join('');


  parEl.innerHTML = html;

}