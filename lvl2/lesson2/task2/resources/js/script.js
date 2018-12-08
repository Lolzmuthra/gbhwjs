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
};

/*
Расширенное меню
 */
function ExtendedMenu(id, className, items) {
    Container.call(this);
    this.id = id;
    this.className = className;
    this.items = items;
}

ExtendedMenu.prototype = Object.create(Container.prototype);
ExtendedMenu.prototype.constructor = ExtendedMenu;
ExtendedMenu.prototype.render = function () {
    let classProp = this.className === undefined ? "" : "class = '" + this.className + "'";
    let idProp = this.id === undefined ? "" : "id = '" + this.id + "'";
    this.htmlCode = "<ul "+classProp +" "+ idProp+"'>";
    for (let item of this.items) {
        if(item instanceof MenuItem) {
            this.htmlCode += item.render();
        } else if (item instanceof ExtendedMenu) {
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
function MenuItem(href, className,  name) {
    Container.call(this);
    this.className = className;
    this.href = href;
    this.name = name;
}
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
    let classProp = this.className === undefined ? "" : "class = '" + this.className + "'";
    let nameProp = this.href === undefined ? this.name : "<a href = '" + this.href + "'>" + this.name + "</a>";
    this.htmlCode = "<li " + classProp + "'>" + nameProp + "</li>";
    return this.isRenderable ? this.htmlCode : "";
};


//------//
let menushka = document.getElementById("menushka");

function placeExtMenu(xhr) {
    if (xhr.readyState !== 4) return;
    let extMenu;
    if (xhr.status === 200) {
        let menuObj = JSON.parse(xhr.responseText);
        extMenu = parseContainer(menuObj);
    } else {
        alert("Ошибка выполнения запроса!");
    }
    menushka.innerHTML = extMenu.render();
}

/**
 * Функция, возвращающая расперсенный и заполненный контейнер
 * @param container JSON, который нужно распарсить
 */

function parseContainer(container) {
    switch (container.type) {
        case 0:
            let extMenuItems = [];
            for (let item of container.items) {
                extMenuItems.push(parseContainer(item));
            }
            return new ExtendedMenu(container.id, container.className, extMenuItems);
        case 1:
            return new MenuItem(container.href, container.className, container.name);
        default:
            console.warn("Неверный type контейнера:");
            console.log(container);
    }
}

let xhr;

if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
    if (window.overrideMimeType) {
        xhr.overrideMimeType('application/json');
    }
} else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

if (!xhr) {
    console.log("Невозможно создать запрос!");
}

xhr.onreadystatechange = function () {
    placeExtMenu(xhr);
};
xhr.ontimeout = function () {
    console.log("Превышено время ожидания запроса!");
};
xhr.open('GET', './resources/json/menu.json', true);
xhr.send();
