/*
1. Улучшить базовый класс, добавив в него общий для всех метод remove(), который удаляет соответствующий DOM-узел.
2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами, т.е с подменю. Подсказка: главный секрет в обходе объекта пунктов меню и проверке типов.
*/

function Container() {
    this.id = "";
    this.className = "";
    this.htmlElement = null;
}

/*
Абстрактный контейнер
*/

/**
 * Абстрактный метод удаления узла
 */
Container.prototype.remove = function () {
    this.htmlElement.remove();
};

/**
 * Асбтрактный метод получения узла
 */
Container.prototype.get = function () {
    return this.htmlElement;
};

/*
Меню
 */
function Menu(id, className, items) {
    Container.call(this);
    this.id = id;
    this.className = className;
    this.items = items;
    this.htmlElement = document.createElement("ul");
    this.htmlElement.classList.add(this.className);
    for (let i in items) {
        let node = document.createElement("li");
        this.htmlElement.appendChild(node);
        node.appendChild(items[i].get());
    } 
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

/*
Элемент меню
 */
function MenuItem(href, name) {
    Container.call(this);
    this.className = "menu-item";
    this.href = href;
    this.name = name;
    this.htmlElement = document.createElement("span");
    this.htmlElement.classList.add(this.className);
    this.htmlElement.innerText = this.name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

let field = document.getElementById("field");
let buttons = document.getElementById("buttons");

let item1 = new MenuItem("/", "[1] Главная");
let item2 = new MenuItem("/catalogue", "[2] Каталог");
let item3 = new MenuItem("/gallery", "[3] Галерея");
let item4 = new MenuItem("/", "[4] Главная");
let item5 = new MenuItem("/catalogue", "[5] Каталог");
let item6 = new MenuItem("/gallery", "[6] Галерея");
let item7 = new MenuItem("/", "[7] Главная");
let item8 = new MenuItem("/catalogue", "[8] Каталог");
let item9 = new MenuItem("/gallery", "[9] Галерея");

let items1 = [item1, item2, item3];
let items2 = [item4, item5, item6];
let items3 = [item7, item8, item9];

let menu1 = new Menu("my_menu", "menu_class", items1);
let menu2 = new Menu("my_menu", "menu_class", items2);
let menu3 = new Menu("my_menu", "menu_class", items3);

let menu = new Menu("my_menu", "menu_class", [menu1, menu2, menu3]);

field.appendChild(menu.get());




// Кнопки
let rmButton1 = document.createElement("button");
rmButton1.setAttribute("onclick", "item1.remove()");
rmButton1.innerText = "item1 rm";
buttons.appendChild(rmButton1);

let rmButton2 = document.createElement("button");
rmButton2.setAttribute("onclick", "item2.remove()");
rmButton2.innerText = "item2 rm";
buttons.appendChild(rmButton2);

let rmButton3 = document.createElement("button");
rmButton3.setAttribute("onclick", "item3.remove()");
rmButton3.innerText = "item3 rm";
buttons.appendChild(rmButton3);

let rmButton = document.createElement("button");
rmButton.setAttribute("onclick", "menu.remove()");
rmButton.innerText = "menu rm";
buttons.appendChild(rmButton);
