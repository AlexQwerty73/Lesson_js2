const isSquare = n => Number.isInteger(Math.sqrt(n));
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



function SeriesSum(n) {
  let res = 0;
  for (let i = 0; i < n; i++) {
    res += 1 / (1 + (3 * i));
  }
  return res.toFixed(2).toString();
}

console.log(SeriesSum(1))
console.log(SeriesSum(2))
console.log(SeriesSum(5))
console.log(SeriesSum(0))




