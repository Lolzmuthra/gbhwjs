function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case ("Сложить"):
        case ("сложить"):
        case ("плюс"):
            return plus(arg1, arg2);
        case ("Отнять"):
        case ("отнять"):
        case ("минус"):
            return minus(arg1, arg2);
        case ("Умножить"):
        case ("умножить"):
            return mult(arg1, arg2);
        case ("Разделить"):
        case ("разделить"):
            return divide(arg1, arg2);
        default:
            return ("Неизвестная операция");
    }
}
let arg1 = parseInt(prompt("Введите первое число:"));
let arg2 = parseInt(prompt("Введите второе число:"));
let operation = prompt("Ведите нужную операцию:");
alert(mathOperation(arg1, arg2, operation));