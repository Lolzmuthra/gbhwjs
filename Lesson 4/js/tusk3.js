/*
3) * На базе игры, созданной на уроке, реализовать игру «Кто хочет стать миллионером?»
*/

let questions = [
    //0
    {
        lvlText: 'Сколько будет 2+2*2?',
        answers: {
            '1': '8',
            '2': '222',
            '3': '6',
            '4': 'Невозможно посчитать'
        },
        rightAnswer: 3,
        weight: 10000
    },
    //1
    {
        lvlText: 'Сколько битов в одном байте?',
        answers: {
            '1': '8',
            '2': '256',
            '3': '1024',
            '4': 'бит больше байта'
        },
        rightAnswer: 1,
        weight: 100000
    },
    //2
    {
        lvlText: 'Что служит устоявшимся ответом в известной загадке "Зимой и летом одним цветом?"',
        answers: {
            '1': 'Елка',
            '2': 'Сосна',
            '3': 'Баобаб',
            '4': 'Можжевельник'
        },
        rightAnswer: 1,
        weight: 100100
    },
    //3
    {
        lvlText: 'Кто из этих правителей реформировал русскую армию в соответствии с прусской военной системой?',
        answers: {
            '1': 'Александр I',
            '2': 'Павел I',
            '3': 'Николай I',
            '4': 'Павел III'
        },
        rightAnswer: 2,
        weight: 789900
    }
];

let question = questions.shift();
let sum = 0;

function getMessage(lvl) {
    let message = lvl.lvlText + '\n';
    for (let answer in lvl.answers) {
        message += answer + ' - ' + lvl.answers[answer] + '\n';
    }
    return message;
}

while (true) {
    if (question.rightAnswer === +prompt(getMessage(question))) {
        sum += question.weight;
        question = questions.shift();
        if (question === undefined) {
            alert("*Тут такая торжественная мелодия* Вы выиграли " + sum + "$!");
            break;
        }
    } else {
        alert("Вы проиграли " + sum + "$ :(");
        break;
    }
}
