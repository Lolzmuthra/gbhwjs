let forma = document.getElementById("forma");

let name = /[А-Яа-яЁё]/;
let telephone = /\+7\(\d{3}\)\d{3}-\d{4}/;
let eMail = /^[A-Za-z\d]+[-.]?[A-Za-z\d]+@[a-z]+\.[a-z]{2,3}$/;

forma.addEventListener("submit", validate);

function validate (event) {
    event.preventDefault();
    validateProperty(forma.elements.yourName, name);
    validateProperty(forma.elements.yourTel, telephone);
    validateProperty(forma.elements.yourEmail, eMail);
}
function validateProperty (inputId, textType) {
    if (!textType.test(inputId.value)){
        inputId.classList.add("wrong-value")
    } else {
        inputId.classList.remove("wrong-value")
    }
}

$.ajax({
    url: "gorods.json",
    dataType: "json",
    success: (data) =>  {
        for (gorod of data) {
            $('<option>' + gorod + '</option>').appendTo('select');
        }
    },
    error() {
        console.warn("Городов нет!");
    }
});