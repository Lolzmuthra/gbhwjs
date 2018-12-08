function isPrime(a) {
    for (let i = 2; i <= a / 2; i++) {
        if (a % i === 0) {
            return false;
        }
    }
    return true;
}

let a = 1;
while (a <= 100) {
    if (isPrime(a)) {
        console.log(a);
    }
    a++;
}