function Gallery(images) {
    this.images = images;
    this.htmlCode = "";
}

Gallery.prototype.constructor = Gallery;
Gallery.prototype.render = function() {
    this.htmlCode = "";
    for (let image of this.images) {
        this.htmlCode += image.render();
    }
    return this.htmlCode;
};

function Image (title, src, alt, href) {
    this.title = title;
    this.src = src;
    this.href = href;
    this.alt = alt;
    this.htmlCode = "";
}

Image.prototype.constructor = Image;
Image.prototype.render = function() {
    if (!isImageExist(this.src)) {
        this.alt = this.src + " not found!";
        this.href ="./resources/img/big/404.jpg";
        this.src = "./resources/img/small/404.jpg";
        this.title = "404";
    }
    this.htmlCode = `<div><a href='${this.href}' target='_blank'><img src='${this.src}' title ='${this.title}' alt ='${this.alt}'></a></div>`;
    return this.htmlCode;
};

let gallery = document.getElementById("gallery");

function placeGallery(xhr) {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200) {
        let menuObj = JSON.parse(xhr.responseText);
        let images = [];
        for (let image of menuObj) {
            images.push(new Image(image.title, image.src, image.alt, image.href));
        }
        let galleryToRender = new Gallery(images);
        gallery.innerHTML = galleryToRender.render();
    } else {
        alert("Ошибка выполнения запроса!");
    }
}

function isImageExist(file) {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        if (window.overrideMimeType) {
            xhr.overrideMimeType('image/jpeg');
        }
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open('GET', file, false);
    xhr.send();
    return xhr.status === 200;
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
    placeGallery(xhr);
};
xhr.ontimeout = function () {
    console.log("Превышено время ожидания запроса!");
};
xhr.open('GET', './resources/json/gallery.json', true);
xhr.send();
