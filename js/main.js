function findOdd(A) {
    let obj = {};
    A.forEach(num => { !obj[num] ? obj[num] = 1 : obj[num] += 1 });
    return Object.keys(obj).find(key => obj[key] % 2 != 0).toString()
}

function wave(str) {
    const arrChars = str.split('');
    let newarr = [];

    arrChars.forEach((char, i) => {
        const letters = /[^a-z]/;
        if (letters.test(char)) return char;

        const word = str.substring(0, i) + str.split('')[i].toUpperCase() + str.substring(i + 1);
        newarr.push(word);
    });

    return newarr;
}

function high(str) {
    const wordArray = str.split(' ');
    const wordNumsArr = wordArray.map(word => word.split('').reduce((count, char) => letterToNumber(char) + count, 0))

    const index = wordNumsArr.indexOf(Math.max(...wordNumsArr));
    return wordArray[index]

    function letterToNumber(letter) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const lCL = letter.toLowerCase();

        if (alphabet.includes(lCL)) {
            return alphabet.indexOf(lCL) + 1;
        }
    }
}

function dirReduc(arr) {
    const opDir = {
        "NORTH": "SOUTH",
        "SOUTH": "NORTH",
        "EAST": "WEST",
        "WEST": "EAST"
    };

    const dirArr = [];

    for (const dir of arr) {
        if (dirArr.length > 0 && dirArr[dirArr.length - 1] === opDir[dir]) {
            dirArr.pop();
        } else {
            dirArr.push(dir);
        }
    }

    return dirArr;
}


function sumDigPow(a, b) {
    let resArr = [];
    for (let i = a; i <= b; i++) {
        const numArr = i.toString().split('');
        const sum = numArr.reduce((count, num, j) => count + Math.pow(Number(num), j + 1), 0);
        if (sum == i) resArr.push(i);
    }
    return resArr
}

function titleCase(title, minorWords) {
    const name = title.toLowerCase();
    const arrWords = name.split(' ');
    minorWords = (minorWords || '').toLowerCase().split(' ');

    return arrWords.map((word, i) => {
        const wordB = word.substring(0, 1).toUpperCase() + word.substring(1);
        return i == 0 ? wordB : minorWords.includes(word) ? word : wordB;
    }).join(' ');
}

function count(string) {
    let obj = {};
    string.split(' ').forEach(word => word.split('').forEach(char => obj[char] ? obj[char] += 1 : obj[char] = 1))
    return obj
}

const solution = (string) => string.split('').map(char => char.toUpperCase() == char ? ' ' + char : char).join('');

function oddity(n) {
    let count = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i == 0) count += (i == n / i) ? 1 : 2;
    }
    return count % 2 == 0 ? 'even' : 'odd';
}

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6)  if (num % i === 0 || num % (i + 2) === 0) return false;
    return true;
}

function findMissingLetter(array) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const size = array[0].toLowerCase() === array[0]; //s - true, b - false
    const newArr = !size ? array.map(char => char.toLowerCase()) : array;

    const firstIndex = alphabet.indexOf(newArr[0]);

    for (let i = firstIndex; i < alphabet.length; i++) {
        if (newArr[i - firstIndex] != alphabet[i]) {
            return size ? alphabet[i] : alphabet[i].toUpperCase();
        }
    }
}

snail = function (array) {
    const arrLen = array.length;
    const allNumsCount = Math.pow(arrLen, 2);

    let snail = [];
    let i = 0;
    do {
        for (let j = i; j < arrLen - i; j++) {
            snail.push(array[i][j]);
            if (snail.length == allNumsCount) break;
        }
        if (snail.length == allNumsCount) break;
        for (let j = i + 1; j < arrLen - i; j++) {
            snail.push(array[j][arrLen - i - 1]);
            if (snail.length == allNumsCount) break;
        }
        if (snail.length == allNumsCount) break;
        for (let j = arrLen - i - 1; j > i; j--) {
            snail.push(array[arrLen - i - 1][j - 1]);
            if (snail.length == allNumsCount) break;
        }
        if (snail.length == allNumsCount) break;
        for (let j = arrLen - i - 1; j > i + 1; j--) {
            snail.push(array[j - 1][i]);
            if (snail.length == allNumsCount) break;
        }
        if (snail.length == allNumsCount) break;
        i++;

    } while (snail.length < allNumsCount)

    if (snail.includes(undefined)) return [];
    return snail;
}


// console.log(snail([[1, 2, 3, 4, 5],
// [6, 7, 8, 9, 10],
// [11, 12, 13, 14, 15],
// [16, 17, 18, 19, 20],
// [21, 22, 23, 24, 25]]));

var maxSequence = function (arr) {
    let maxSum = 0;
    let curSum = 0;

    for (let i = 0; i < arr.length; i++) {
        curSum = Math.max(0, curSum + arr[i]);
        maxSum = Math.max(maxSum, curSum);
    }

    return maxSum;
};

const zero = (op) => op ? op(0) : 0;
const one = (op) => op ? op(1) : 1;
const two = (op) => op ? op(2) : 2;
const three = (op) => op ? op(3) : 3;
const four = (op) => op ? op(4) : 4;
const five = (op) => op ? op(5) : 5;
const six = (op) => op ? op(6) : 6;
const seven = (op) => op ? op(7) : 7;
const eight = (op) => op ? op(8) : 8;
const nine = (op) => op ? op(9) : 9;

const plus = r => l => l + r
const minus = r => l => l - r;
const times = r => l => l * r;
const dividedBy = r => l => r === 0 ? "+0" : l / r;


function numbersOfLetters(integer) {
    const strNumsArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    const numToStr = (num) => num < 10 ? strNumsArr[num] : num.toString().split('').map(digit => strNumsArr[Number(digit)]).join('');

    const resArr = [];

    while (integer !== 4) {
        const stringNums = numToStr(integer);
        resArr.push(stringNums);
        integer = stringNums.length;
    }

    resArr.push('four');

    return resArr;
}

function findSequences(n) {
    let res = [];
    for (let i = 1; i < n; i++) {
        let sum = 0;
        let sequence = [];
        for (let j = i; j <= n; j++) {
            sequence.push(j);
            sum += j;
            if (sum === n) {
                res.push(sequence.slice());
                break;
            }
            if (sum > n) {
                break;
            }
        }
    }
    return res.reverse();
}

function perfectSquare(string) {
    const rows = string.trim().split('\n');
    const numRows = rows.length;
    const rowLength = rows[0].length;

    for (const row of rows) {
        if (row.length !== rowLength || !/^[.\n]*$/.test(row)) {
        }
    }
    return numRows === rowLength;
}

function sort(students) {
    const sortedStudents = students.sort((a, b) => {
        if (b.gpa !== a.gpa) {
            return b.gpa - a.gpa;
        }
        const lastNameA = a.fullName.split(' ')[1][0];
        const lastNameB = b.fullName.split(' ')[1][0];
        if (lastNameA !== lastNameB) {
            return lastNameA.localeCompare(lastNameB);
        }
        return a.age - b.age;
    });

    const namesStr = sortedStudents.map(student => student.fullName).join(',');
    return namesStr;
}

class Student {
    constructor(age, gpa, fullName) {
        this.age = age;
        this.gpa = gpa;
        this.fullName = fullName;
    };
};
var students = [new Student(23, 88, "David Goodman"),
new Student(25, 82, "Mark Rose"),
new Student(22, 90, "Jane Doe"),
new Student(25, 90, "Jane Dane")];
console.log(sort(students));