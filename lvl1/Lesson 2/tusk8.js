function power(base, pow) {
    return pow === 0 ? 1 : base * power(base, pow - 1);
}

alert(power(2, 5));