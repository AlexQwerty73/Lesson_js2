const doc = document;
const btn = doc.querySelector('#btn-dog');
const photoContainer = doc.querySelector('.dog-photo');
const opSelect = doc.querySelector('#select');
const selectContainer = doc.querySelector('.select-container');

const breedSelectSelector = '#breed';
const subBreedSelectSelector = '#subBreed';

const api = {
  random: 'https://dog.ceo/api/breeds/image/random',
  breeds: 'https://dog.ceo/api/breeds/list/all',
};

btn.onclick = async () => {
  const breedSelect = doc.querySelector(breedSelectSelector);
  const subBreedSelect = doc.querySelector(subBreedSelectSelector);

  if (subBreedSelect && subBreedSelect.options.length > 0) {
    const breedVal = breedSelect.value;
    const subBreedVal = subBreedSelect.value;
    showSubBreedDog(breedVal, subBreedVal, fetchDog, photoContainer);
  } else if (breedSelect && breedSelect.options.length > 0) {
    const selectVal = breedSelect.value;
    showBreedDog(selectVal, fetchDog, photoContainer);
  } else {
    showDog(api.random, fetchDog, photoContainer);
  }
};

opSelect.onchange = () => renderSelects();

 function renderSelects() {
  const breedSelect = doc.querySelector(breedSelectSelector);
  const subBreedSelect = doc.querySelector(subBreedSelectSelector);

  if (opSelect.value === 'random') {
    if (breedSelect) removeElement(breedSelect);
    if (subBreedSelect) removeElement(subBreedSelect);
  } else if (opSelect.value === 'breed') {
    if (!breedSelect) renderBreedsSelect(api.breeds, fetchDog, selectContainer);
    if (subBreedSelect) removeElement(subBreedSelect);
  } else if (opSelect.value === 'sub-breed') {
    if (!breedSelect) renderBreedsSelect(api.breeds, fetchDog, selectContainer);
    if (!subBreedSelect) renderSubBreedsSelect(getSubBreedUrl(breedSelectSelector), fetchDog, selectContainer);
  }
}

function rerenderSubBreed() {
// 
}

async function fetchDog(url) {
  const res = await fetch(url);
  const data = await res.json();
  const src = data.message;
  return src;
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
async function showSubBreedDog(breed, subBreed, fetchCallback, parentElement) {
  console.log(breed, subBreed);
  const url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images`
  console.log(url);
  const arr = await fetchCallback(url);
  const imgSrc = arr[getRandomNum(0, arr.length)];
  renderDogImg(imgSrc, parentElement);
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
async function renderSubBreedsSelect(subBreedsUrl, fetchCallback, parentElement) {
  const newSelect = doc.createElement('select');
  newSelect.id = 'subBreed'
  const obj = await fetchCallback(subBreedsUrl);
  let breedsArr = [];
  for (let key of obj) breedsArr.push(key);


  for (let subBreed of breedsArr) {
    const breedOp = doc.createElement('option');
    breedOp.value = subBreed;
    breedOp.innerText = subBreed;
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
async function getSubBreedUrl(breedSelect) {
  console.log(breedSelect);
  return breedSelect.value;
}