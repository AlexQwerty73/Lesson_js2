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
