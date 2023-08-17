const doc = document;
const btn = doc.querySelector('#btn-dog');
const photoContainer = doc.querySelector('.dog-photo');
const opSelect = doc.querySelector('#select');
const selectContainer = doc.querySelector('.select-container');
const breedSelectSelector = '#breed';

const api = {
  random: 'https://dog.ceo/api/breeds/image/random',
  breeds: 'https://dog.ceo/api/breeds/list/all',
  subBreed:'https://dog.ceo/api/breed/hound/list'//!!!!!!!!!
};

btn.onclick = () => {
  if (isElementPresent(breedSelectSelector)) {
    const select = doc.querySelector(breedSelectSelector);
    const selectVal = select.value;

    showBreedDog(selectVal, fetchBreeds, photoContainer)
  } else {
    showDog(api.random, fetchRandDog, photoContainer)
  }
};

opSelect.onchange = () => {
  if (isElementPresent(breedSelectSelector)) {
    removeElement(breedSelectSelector)
  } else {
    renderBreedsSelect(api.breeds, fetchBreeds, selectContainer)
  }
}

async function fetchRandDog(url) {
  const res = await fetch(url);
  const data = await res.json();
  const src = data.message;
  return src;
}
async function fetchBreeds(url) {
  const res = await fetch(url);
  const data = await res.json();
  let obj = data.message;
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
async function showBreedDog(breed, fetchCallback, parentElement) {
  const url = `https://dog.ceo/api/breed/${breed}/images`
  const arr = await fetchCallback(url);
  const imgSrc = arr[getRandomNum(0, arr.length)]
  renderDogImg(imgSrc, parentElement)
}
function renderDogImg(src, parentElement) {
  parentElement.innerHTML = `<img src="${src}">`;
}
async function renderBreedsSelect(url, fetchCallback, parentElement) {
  const newSelect = doc.createElement('select');
  newSelect.id = 'breed'
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
function removeElement(selector) {
  doc.querySelector(selector).remove();
}
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}