let a = prompt("Первое число:");
let b = prompt("Второе число:");
if (a>=0 && b>=0) {
    alert(a - b);
}
else if (a<0 && b<0) {
    alert(a * b);
}
else {
    alert(a + b);
}