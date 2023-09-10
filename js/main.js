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

console.log(high('man i need a taxi up to ubud'));