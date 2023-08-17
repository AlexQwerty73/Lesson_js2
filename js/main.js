const doc = document;
const btn = doc.querySelector('#btn-dog');
const photoContainer = doc.querySelector('.dog-photo');
const opSelect = doc.querySelector('#select');
const selectContainer = doc.querySelector('.select-container');

const api = {
  random: 'https://dog.ceo/api/breeds/image/random',
  breeds: 'https://dog.ceo/api/breeds/list/all'
};

btn.onclick = () => showDog(api.random, fetchDog, photoContainer)
console.log(fetchBreeds(api.breeds));
opSelect.onchange = () => {
  const element = '#breed';
  console.log(isElementExists(element));
  if (isElementExists(element)) {
    removeElement(element)
  } else {
    renderBreedsSelect(api.breeds, fetchBreeds, selectContainer)
  }
}

async function fetchDog(url) {
  const res = await fetch(url);
  const data = await res.json();
  const src = data.message;
  return src;
}
async function fetchBreeds(url) {
  const res = await fetch(url);
  const data = await res.json();
  let obj = data.message;
  // obj = removeEmptyArrays(obj);
  return obj;
}

async function getBreedArr(breed) {
  const url = `https://dog.ceo/api/breed/${breed}/images`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

async function showDog(url, fetchCallback, parentElement) {
  const imgSrc = await fetchCallback(url);
  renderDogImg(imgSrc, parentElement)
}
function renderDogImg(src, parentElement) {
  parentElement.innerHTML = `<img src="${src}">`;
}
async function renderBreedsSelect(url, fetchCallback, parentElement) {
  const newSelect = doc.createElement('select');
  const obj = await fetchCallback(url);
  let breedsArr = [];
  for (let key in obj) breedsArr.push(key);


  for (let breed of breedsArr) {
    const breedOp = doc.createElement('option');
    breedOp.value = breed;
    breedOp.innerText = breed;
    newSelect.append(breedOp);
  }
  parentElement.append(newSelect);
}


function findElement(selector) {
  return doc.querySelector(selector);
}
function isElementPresent(selector) {
  return !!findElement(selector);
}
function removeElement(element) {
  const elem = document.querySelector(element);
  elem.parentNode.removeChild(elem);
}
// function removeEmptyArrays(obj) {
//   const newObj = {};
//   for (const key in obj) {
//     if (obj[key].length > 0) {
//       newObj[key] = obj[key];
//     }
//   }
//   return newObj;
// }