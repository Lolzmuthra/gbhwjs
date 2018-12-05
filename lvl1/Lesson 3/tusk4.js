function getString(symbol, symbolNumber) {
    let arr = [];
    for (let i = 0; i < symbolNumber; i++) {
        arr.push(symbol);
    }
    return arr.join('');
}

for (let i = 1; i <= 20; i++) {
    console.log(getString('x', i));
}