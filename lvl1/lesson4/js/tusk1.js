/*
1) Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе
объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны
получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать
соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

function numbersObject(number) {
    if (number < 0 || number > 999) {
        console.log("Неправильные параметры ввода");
        return {};
    } else {
        return convertNumber(number);
    }
}

function convertNumber(n) {
    let edinitca = n % 10;
    n -= n % 10;
    n /= 10;
    let desyatok = n % 10;
    n -= n % 10;
    n /= 10;
    let sotnya = n;
    return {
        "единицы": edinitca,
        "десятки": desyatok,
        "сотни": sotnya
    };
}

let input = parseInt(prompt("Введите число: "));
if (Number.isNaN(input)) {
    console.log("Не число вообще");
} else {
    console.log(numbersObject(input));
}
