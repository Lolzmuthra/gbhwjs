let levels = [
    //0
    {
        lvlText: 'Налево пойдёшь - коня потеряешь, направо пойдёшь - жизнь потеряешь, прямо пойдёшь - жив будешь, да себя позабудешь',
        answers: {},
        childs: {},
        isEnd: false
    },
    //1
    {
        lvlText: 'Вы встретили Соловья-разбойника',
        answers: {},
        childs: {},
        isEnd: false
    },
    //2
    {
        lvlText: 'Вы встретили Змея Горыныча',
        answers: {},
        childs: {},
        isEnd: false
    },
    //3
    {
        lvlText: 'Вы встретили Варвара-красавица',
        answers: {},
        childs: {},
        isEnd: false
    },
    //4
    {
        lvlText: 'И жили вы долго и счастливо!',
        answers: {},
        childs: {},
        isEnd: true
    },
    //5
    {
        lvlText: 'И сложили вы буйну голову!',
        answers: {},
        childs: {},
        isEnd: true
    }
];

levels[0].answers['1'] = 'Пойти налево';
levels[0].childs['1'] = levels[1];

levels[0].answers['2'] = 'Пойти направо';
levels[0].childs['2'] = levels[2];

levels[0].answers['3'] = 'Пойти прямо';
levels[0].childs['3'] = levels[3];

levels[1].answers['1'] = 'Сразиться с ним';
levels[1].childs['1'] = levels[4];

levels[1].answers['2'] = 'Попробовать обойти';
levels[1].childs['2'] = levels[5];

levels[2].answers['1'] = 'Сразиться с ним';
levels[2].childs['1'] = levels[5];

levels[2].answers['2'] = 'Украсть сокровища';
levels[2].childs['2'] = levels[4];

levels[3].answers['1'] = 'Жениться на ней';
levels[3].childs['1'] = levels[5];

let level = levels[0];

while (!level.isEnd) {
    level = level.childs[prompt(getMessage(level))];
}

alert(level.lvlText);

function getMessage(lvl) {
    let message = lvl.lvlText + '\n';
    for (let answer in lvl.answers) {
        message += answer + ' - ' + lvl.answers[answer] + '\n';
    }
    return message;
}

/*
2) Для игры, реализованной на уроке, добавить возможность вывода хода номер n (номер задается пользователем)
*/
let number = parseInt(prompt("Введите номер уровня: "));
alert(getMessage(levels[number - 1]));
