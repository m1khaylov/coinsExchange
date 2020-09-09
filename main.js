function exchangeOfCoins(s, a, b, x) {
    if (s < a && s < b) {
        return 'Данная сумма меньше номинала каждой из монет';
    }

    let nums = [], minCoinValue;

    a > b ? minCoinValue = b : minCoinValue = a;

    for (let i = 0; i <= s; i++) {
        for (let j = 0; j <= s; j++) {
            for (let c = 0; c < minCoinValue; c++) {
                if (a*i + b*j + c === s) {
                    nums.push([i, j, c]);
                }
            }
        }
    }

    if (nums.some(item => item[2] === 0)) {
        nums = nums.filter(elem => elem[0] >= 0 && elem[1] >= 0 && elem[2] === 0);
    } else if (nums.some(item => item[1] < item[2])) {
        nums = nums.filter(elem => elem[1] > elem[2]);
    }

    if (x === 0) {
        return nums[nums.length-1];
    }

    if (x > 0) {
        let closest = nums.map(elem => Math.round(elem[0]*100/(elem[0]+elem[1])))
            .reduce((prev, curr) => {
            return Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev;
        });

        let result = nums.filter(elem => {
            return Math.round( elem[0]*100 / (elem[0]+elem[1]) ) === closest;
        });

        return result[0];
    }
}

let s = document.querySelector('#s');
let x = document.querySelector('#x');
let a = document.querySelector('#a');
let b = document.querySelector('#b');

document.querySelector('#btn').addEventListener('click', (e) => {
    e.preventDefault();
    let output = exchangeOfCoins(+s.value, +a.value, +b.value, +x.value);

    // Введенная сумма меньше номинала каждой из монет
    if (typeof output === 'string') {
        document.querySelector('#result').innerHTML = `${output}`;
    }

    // Размен без остатка
    if (output.length === 3 && output[2] === 0) {
        return document.querySelector('#result').innerHTML = `При S = ${s.value}, A = ${a.value}, B = ${b.value}, X = ${x.value || 0}% результатом будет: ${s.value} руб. = ${output[0]} x ${a.value} руб. + ${output[1]} x ${b.value} руб.`;
    }

    // Размен с остатком
    if (output.length === 3 && output[2] > 0) {
        return document.querySelector('#result').innerHTML = `При S = ${s.value}, A = ${a.value}, B = ${b.value}, X = ${x.value || 0}% результатом будет: ${s.value} руб. = ${output[0]} x ${a.value} руб. + ${output[1]} x ${b.value} руб. + остаток ${output[2]} руб.`;
    }
});

