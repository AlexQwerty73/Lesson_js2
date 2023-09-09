import { getData } from "../API/api.js";
import { getHash } from "../utils/utils.js";

const doc = document;
const cachedData = {};

export const renderData = async () => {
  const hash = getHash();
  const parEl = doc.querySelector('.data');
  const idElement = Number(location.href.slice(location.href.lastIndexOf('/') + 1));

  parEl.innerHTML = '<h3>Loading data...</h3>';

  if (!hash) return;

  //якщо після останньої / є число то видаляє усе що знаходиться після якщо ні то бере нормальний hash
  const hashKey = Number.isInteger(idElement) ? hash.substring(0, hash.lastIndexOf('/')) : hash;

  //якщо данних немає в cachedData то записує туди їх
  if (!cachedData[hashKey]) cachedData[hashKey] = await getData(hashKey);

  const data = cachedData[hashKey];

  const html =
    Number.isInteger(idElement)
      ? singleDataHtml()
      : listDataHtml();

  parEl.innerHTML = html;

  function singleDataHtml() {
    return `<div class="btn data-item">
      ${Object.keys(data['results'][idElement])
        .map(key => `<br><li>${key}: ${data['results'][idElement][key]}</li><br>`)
        .join('')}</div>`
  };

  function listDataHtml() {
    return Object.keys(data['results'])
      .map((key, i) => (`<div class="btn data-item"><a href="#${hash}/${i}">
      ${Object.keys(data['results'][key])
          .map(k => `<li>${k}: ${data['results'][key][k]}</li><br>`)
          .join('')}</a></div>`))
      .join('');
  }
};
