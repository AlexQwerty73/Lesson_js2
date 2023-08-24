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




function validateBattlefield(field) {
  const len = field.length;
  const ships = {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
  };
  let shipCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const x = field[i][j];
      if (x === 1) {
        if (
          (i > 0 && field[i - 1][j] === 1) ||
          (j > 0 && field[i][j - 1] === 1)
        ) {
          return false;
        }

        if (j > 0) {
          if (i > 0) {
            if (field[i - 1][j - 1] === x) {
              return false;
            }
          }
          if (len > i) {
            if (field[i + 1][j - 1] === x) {
              return false;
            }
          }
        }
        if (j < len - 1) {
          if (i > 0) {
            if (field[i - 1][j + 1] === x) {
              return false;
            }
          }
          if (len > i) {
            if (field[i + 1][j + 1] === x) {
              return false;
            }
          }
        }

        let shipSize = 1;
        for (let k = j + 1; k < len && field[i][k] === 1; k++) {
          shipSize++;
        }
        for (let k = i + 1; k < len && field[k][j] === 1; k++) {
          shipSize++;
        }

        if (!(shipSize in ships)) {
          return false;
        }
        shipCount[shipSize]++;
        if (shipCount[shipSize] > ships[shipSize]) {
          return false;
        }

        for (let k = 0; k < shipSize; k++) {
          if (i + k < len) {
            field[i + k][j] = 2;
          }
          if (j + k < len) {
            field[i][j + k] = 2;
          }
        }
      }
    }
  }

  for (const size in ships) {
    if (shipCount[size] !== ships[size]) {
      return false;
    }
  }

  return true;
}

// console.log(validateBattlefield([
//   [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
//   [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
//   [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
//   [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
//   [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]));




function pigIt(str) {
  const arr = str.split(' ');

  let na = '';
  for (let word of arr) {
    if (/^[a-zA-Z]+$/.test(word)) {
      const w = [...word];
      const fl = w.shift();
      na += w.join('') + fl + 'ay ';
    } else {
      na += word + ' ';
    }
  }
  return na.trim();
}


const countSheeps = (arr) => arr.reduce((count, value) => count + (value === true), 0);


console.log(countSheeps([true, true, true, false, true, false]));