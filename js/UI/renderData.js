import { getData } from "../API/api.js";
import { getHash } from "../utils/utils.js";

const doc = document;

const cachedData = {};

export const renderData = async () => {
  const hash = getHash();
  const parEl = doc.querySelector('.data');

  //бере усе після останього /
  const idElement = Number(location.href.slice(location.href.lastIndexOf('/') + 1));

  if (!hash) return;

  if (Number.isInteger(idElement)) {
    // прибирає усе після останього /
    const nh = hash.substring(0, hash.lastIndexOf('/'));

    //якщо нема в cachedData то заносить туди данні 
    if (!cachedData[nh]) {
      cachedData[nh] = await getData(nh);
    }

    const data = cachedData[nh];

    const html = `<div class="btn data-item">
    ${Object.keys(data['results'][idElement])
        .map(key => `<li>${key}: ${data['results'][idElement][key]}</li>`).join('')}</div>`;

    parEl.innerHTML = html;
    return;
  }

  //якщо нема в cachedData то заносить туди данні 
  if (!cachedData[hash]) {
    cachedData[hash] = await getData(hash);
  }

  const data = cachedData[hash];

  const html =
    Object.keys(data['results'])
      .map((key, i) => `<div class="btn data-item"><a href="#/${hash}/${i}">${Object.keys(data['results'][key])
        .map(k => `<li>${k}: ${data['results'][key][k]}</li>`)
        .join('')}</a></div>`)
      .join('');

  parEl.innerHTML = html;
};
