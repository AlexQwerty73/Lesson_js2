const doc = document;
const btn = doc.querySelector('#btn-dog');
const photoContainer = doc.querySelector('.dog-photo');
const opSelect = doc.querySelector('#select');
const selectContainer = doc.querySelector('.select-container');
const breedSelectSelector = '#breed';
const subBreedSelectSelector = '#subBreed';

let breed = 'affenpinscher';

const api = {
  random: 'https://dog.ceo/api/breeds/image/random',
  breeds: 'https://dog.ceo/api/breeds/list/all',
  subBreed: `https://dog.ceo/api/breed/***/list`,
};

btn.onclick = () => {
  if (opSelect.value === 'sub-breed') {
    const selectSB = doc.querySelector(subBreedSelectSelector);
    const selectSBVal = selectSB.value;

    showSubBreedDog(breed, selectSBVal, fetchRandDog, photoContainer)
  }
  else if (opSelect.value === 'breed') {
    const select = doc.querySelector(breedSelectSelector);
    const selectVal = select.value;

    showBreedDog(selectVal, fetchRandDog, photoContainer)
  } else if (opSelect.value === 'random') {
    showDog(api.random, fetchRandDog, photoContainer)
  } else if (opSelect.value === 'gallery') {
    const select = doc.querySelector(breedSelectSelector);
    const selectVal = select.value;
    showBreedGallery(selectVal, fetchRandDog, photoContainer)
  }
};
opSelect.onchange = () => {
  if (opSelect.value === 'sub-breed') {
    if (isElementPresent(breedSelectSelector)) removeElement(breedSelectSelector);
    if (isElementPresent(subBreedSelectSelector)) removeElement(subBreedSelectSelector);
    renderBreedsSelect(api.breeds, fetchRandDog, selectContainer)
    renderSubBreedsSelect(api.subBreed.replace('***', breed), fetchRandDog, selectContainer)
  }
  else if (opSelect.value === 'breed') {
    if (isElementPresent(breedSelectSelector)) removeElement(breedSelectSelector);
    if (isElementPresent(subBreedSelectSelector)) removeElement(subBreedSelectSelector);
    renderBreedsSelect(api.breeds, fetchRandDog, selectContainer);
  } else if (opSelect.value === 'random') {
    removeElement(breedSelectSelector);
    removeElement(subBreedSelectSelector);
  } else if (opSelect.value === 'gallery') {
    if (isElementPresent(breedSelectSelector)) removeElement(breedSelectSelector);
    if (isElementPresent(subBreedSelectSelector)) removeElement(subBreedSelectSelector);
    renderBreedsSelect(api.breeds, fetchRandDog, selectContainer);
  }
}

async function fetchRandDog(url) {
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
  renderDogImg(imgSrc, parentElement);
}
async function showSubBreedDog(breed, subBreed, fetchCallback, parentElement) {
  const url = subBreed != '' ? `https://dog.ceo/api/breed/${breed}/${subBreed}/images` : `https://dog.ceo/api/breed/${breed}/images`
  const arr = await fetchCallback(url);
  const imgSrc = arr[getRandomNum(0, arr.length)]
  renderDogImg(imgSrc, parentElement)
}
async function showBreedGallery(breed, fetchCallback, parentElement) {
  parentElement.innerHTML = '';
  const url = `https://dog.ceo/api/breed/${breed}/images`
  const arr = await fetchCallback(url);
  for (let i = 0; i < arr.length; i++) {
    parentElement.innerHTML += `<img src="${arr[i]}">`;
  }
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

  newSelect.onchange = () => {
    breed = newSelect.value;
    api.subBreed = api.subBreed.replace('***', breed);
    if (opSelect.value === 'sub-breed') {
      removeElement(subBreedSelectSelector);
      renderSubBreedsSelect(
        api.subBreed.includes('***') ?
          api.subBreed.replace('***', breed) : `https://dog.ceo/api/breed/${breed}/list`
        , fetchRandDog, selectContainer)
    }
  }
}

async function renderSubBreedsSelect(url, fetchCallback, parentElement) {
  console.log(url);
  const newSelect = doc.createElement('select');
  newSelect.id = 'subBreed'
  const obj = await fetchCallback(url);
  let breedsArr = [];
  for (let key of obj) breedsArr.push(key);
  console.log(breedsArr);

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