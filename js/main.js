const isSquare = n => Number.isInteger(Math.sqrt(n));
// console.log(isSquare(81)); 

const nameArr = ['Andrii', 'Alex', 'Nik']

transformAndShow(nameArr, function (item) {
  return (
    `<div class="box-item">
      <span>
        ${item}
      </span>
    </div>`
  );
});

function transformAndShow(data, callback) {
  const htmlEl = document.querySelector('.box');
  const transformedData = transformData(data);

  for (let i = 0; i < transformedData.length; i++) {
    const item = transformedData[i];
    htmlEl.innerHTML += callback(item);
  }
}

function transformData(arr) {
  const transformedData = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].toUpperCase();
    transformedData.push(item);
  }
  return transformedData;
}

function getDivElement(item) {
  return `<div class="box-item">${item}</div>`
}