/*
1. Улучшить базовый класс, добавив в него общий для всех метод remove(), который удаляет соответствующий DOM-узел.
2. Создать наследника класса Menu – новый класс должен уметь строить меню со вложенными пунктами, т.е с подменю. Подсказка: главный секрет в обходе объекта пунктов меню и проверке типов.
*/

function Container() {
    this.id = "";
    this.className = "";
    this.htmlCode = "";
    this.isRenderable = true;
}

/*
Абстрактный контейнер
*/

/**
 * Абстрактный метод удаления узла
 */
Container.prototype.remove = function () {
    this.isRenderable = false;
    return this;
};

/**
 * Абстрактный метод добавления узла
 */
Container.prototype.add = function () {
    this.isRenderable = true;
    return this;
};

/**
* Абстрактный метод отрисовки узла
*/
Container.prototype.render = function() {
    throw new Error("Требуется реализовать метод!");
}

/*
Меню
 */
function Menu(id, className, items) {
    Container.call(this);
    this.id = id;
    this.className = className;
    this.items = items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {
    this.htmlCode = "<ul class='" + this.className + "' id = '" + this.id + "'>";
    for (let i in this.items) {
        let item = this.items[i];
        if(item instanceof MenuItem){
            this.htmlCode += item.render();
        } else {
            this.htmlCode += "";
        }
    }
    this.htmlCode += "</ul>";
    return this.isRenderable? this.htmlCode: "";
};

/*
Расширенное меню
 */
function ExtendedMenu(id, className, items) {
    Menu.call(this);
    this.id = id;
    this.className = className;
    this.items = items;
}

ExtendedMenu.prototype = Object.create(Menu.prototype);
ExtendedMenu.prototype.constructor = ExtendedMenu;
ExtendedMenu.prototype.render = function () {
    this.htmlCode = "<ul class='" + this.className + "' id = '" + this.id + "'>";
    for (let i in this.items) {
        let item = this.items[i];
        if(item instanceof MenuItem) {
            this.htmlCode += item.render();
        } else if (item instanceof Menu || item instanceof ExtendedMenu) {
            this.htmlCode += "<li>" + item.render() + "</li>";
        } else {
            this.htmlCode += "";
        }
    }
    this.htmlCode += "</ul>";
    return this.isRenderable? this.htmlCode: "";
};

/*
Элемент меню
 */
function MenuItem(href, name) {
    Container.call(this);
    this.className = "menu-item";
    this.href = href;
    this.name = name;
}
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
    this.htmlCode = "<li class = '" + this.className + "'><a href = '" + this.href + "'>" + this.name + "</a></li>";
    return this.isRenderable? this.htmlCode: "";
};

//- Служебный метод для добавления кнопок -//
function addButtons() {
    return `
        <hr>
        <div id = 'element-buttons'>
            <input type='button' name='remove 1-1-1' value='remove block 1-1' onclick='item1.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 1-2' onclick='item2.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 1-3' onclick='item3.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 2-1' onclick='item4.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 2-2' onclick='item5.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 2-3' onclick='item6.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 3-1' onclick='item7.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 3-2' onclick='item8.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 3-3' onclick='item9.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove block 4' onclick='item10.remove(); field.innerHTML = extMenu.render();'>
        </div>
        <hr>
        <div id = 'menu-buttons'>
            <input type='button' name='remove 1-1-1' value='remove menu 1' onclick='menu1.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove menu 2' onclick='menu2.remove(); field.innerHTML = extMenu.render();'>
            <input type='button' name='remove 1-1-1' value='remove menu 3' onclick='menu3.remove(); field.innerHTML = extMenu.render();'>
        </div>
        <hr>
        <div id = 'extMenu-buttons'>
            <input type='button' name='remove 1-1-1' value='remove extMenu ' onclick='extMenu.remove(); field.innerHTML = extMenu.render();'>
        </div>
    `;
}
    

//------//

let field = document.getElementById("field");
let buttons = document.getElementById("buttons");

let item1 = new MenuItem("./", "[1] Главная");
let item2 = new MenuItem("./catalogue", "[2] Каталог");
let item3 = new MenuItem("./gallery", "[3] Галерея");
let item4 = new MenuItem("./", "[4] Главная");
let item5 = new MenuItem("./catalogue", "[5] Каталог");
let item6 = new MenuItem("./gallery", "[6] Галерея");
let item7 = new MenuItem("./", "[7] Главная");
let item8 = new MenuItem("./catalogue", "[8] Каталог");
let item9 = new MenuItem("./gallery", "[9] Галерея");
let item10 = new MenuItem("./gallery", "[10] Галерея");

let items1 = [item1, item2, item3];
let items2 = [item4, item5, item6];
let items3 = [item7, item8, item9];

let menu1 = new Menu("my-menu1", "menu-class", items1);
let menu2 = new Menu("my-menu2", "menu-class", items2);
let menu3 = new Menu("my-menu3", "menu-class", items3);

let extMenu = new ExtendedMenu("ext-my-menu", "menu-class", [menu1, menu2, menu3, item10]);

//document.write(extMenu.render() + );

field.innerHTML = extMenu.render();
buttons.innerHTML = addButtons();
