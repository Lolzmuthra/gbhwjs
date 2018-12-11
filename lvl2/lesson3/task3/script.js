let forma = document.getElementById("forma");

let name = /[А-Яа-яЁё]/;
let telephone = /\+7\(\d{3}\)\d{3}-\d{4}/;
let eMail = /[A-Za-z\d][\w.-]*[A-Za-z\d]@[a-z]+\.[a-z]{2,3}/;

forma.addEventListener("submit", validate);

function validate (event) {
    event.preventDefault();
    if (!name.test(forma.elements.yourName.value)){
        forma.elements.yourName.classList.add("wrong-value")
    } else {
        forma.elements.yourName.classList.remove("wrong-value")
    }
    if (!telephone.test(forma.elements.yourTel.value)){
        forma.elements.yourTel.classList.add("wrong-value")
    } else {
        forma.elements.yourTel.classList.remove("wrong-value")
    }
    if (!eMail.test(forma.elements.yourEmail.value)){
        forma.elements.yourEmail.classList.add("wrong-value")
    } else {
        forma.elements.yourEmail.classList.remove("wrong-value")
    }
}
