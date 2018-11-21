let images = document.getElementsByClassName("small_img");
let appDiv = document.getElementById("big_picture");
let previous = document.getElementById("previous");
let next = document.getElementById("next");

function changeBigPicture(event){
    let eventElement = event.target;
    let imageNumber = parseInt(eventElement.getAttribute("data-image"));
	showPicture(imageNumber);
}
function showPicture (img) {
    if (img === 0) img = images.length;
    if (img > images.length) img = 1;
	appDiv.innerHTML = "";
    let src = "img/big/" + img + ".jpg";
    let imageDomElement = document.createElement("img");
    imageDomElement.src = src;
    imageDomElement.onerror = function(){alert("Здесь могла быть ваша реклама")};
    appDiv.appendChild(imageDomElement);
    previous.onclick = function () {showPicture(img - 1)};
    next.onclick = function (){showPicture(img + 1)};
}

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", changeBigPicture);
}
