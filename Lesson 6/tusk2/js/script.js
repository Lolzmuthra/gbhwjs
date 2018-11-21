/*

let product = document.getElementsByClassName("product");
cart.innerHTML = "";

for (let i = 0; i < product.length; i++) {
    product[i].addEventListener("click", addProductInShop);
}

function addProductInShop(event) {
    let eventElement = event.target;
    let productId = parseInt(eventElement.getAttribute("data-product"));
    let parentBox = eventElement.parentNode;
    let productName = parentBox.getElementsByClassName("product-name").innerHTML;
    let productPrice = parentBox.getElementsByClassName("product-price").innerHTML;
    cart.innerHTML = productName + productPrice

}
*/

let tovars = {};
let cart = document.getElementById("cart");
let products = [
    {
        prImage: 'img/hleb.jpg',
        prName: 'Хлеб',
        prPrice: 30
    },
    {
        prImage: 'img/voda.jpg',
        prName: 'Вода',
        prPrice: 25
    },
    {
        prImage: 'img/sil.jpg',
        prName: 'Соль',
        prPrice: 50
    }
];
let productCont = document.getElementById("product-cont");

function addToCart(a, i) {
    if (tovars[i] == undefined) {
        tovars[i] = 0;
    }
    tovars[i]++;
    cart.innerHTML = "";
    let popalNaBabki = 0;
    for (let p in tovars) {
        let item = getNewBindedNode(cart, "p");
        item.innerText = products[p].prName + " (" + tovars[p] + " шт) " + tovars[p] * products[p].prPrice + "р.";
        popalNaBabki += tovars[p] * products[p].prPrice;
    }
    getNewBindedNode(cart, "hr");
    let vsego = getNewBindedNode(cart, "b");
    vsego.innerText = "Стоимость корзины: " + popalNaBabki + "р.";
}

function getNewBindedNode(rootNode, type) {
    let result = document.createElement(type);
    rootNode.appendChild(result);
    return result;
}

for (let i = 0; i < products.length; i++) {

    let product = getNewBindedNode(productCont, "div");
    product.classList.add("product");

    let image = getNewBindedNode(product, "img");
    image.src = products[i].prImage;
    image.alt = products[i].prName;
    // ...
    let name = getNewBindedNode(product, "div");
    name.classList.add("product-name");
    name.innerText = products[i].prName;

    let price = getNewBindedNode(product, "div");
    price.classList.add("product-price");
    price.innerText = products[i].prPrice;

    let buyButton = getNewBindedNode(price, "a");
    buyButton.classList.add("product-button");
    buyButton.innerText = 'Купить';
    buyButton.href = '#';
    buyButton.onclick = function () {
        addToCart(products[i], i)
    };
}
