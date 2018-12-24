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
        inputId.classList.add("wrong-value");
        $( inputId ).effect("bounce", 500, callback );
    } else {
        inputId.classList.remove("wrong-value")
    }
}
// Callback function to bring a hidden box back
function callback() {
    setTimeout(function() {
        $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
    }, 1000 );
}
$.ajax({
    url: "cities.json",
    dataType: "json",
    success: (data) =>  {
        for (gorod of data) {
            $('<option>' + gorod + '</option>').appendTo('select');
        }
    },
    error() {
        $( function() {
            $("#dialog-message").dialog({
                modal: true,
                buttons: {
                    Ok: function() {
                       location.reload();
                    }
                }
            });
        } );
    }
});

$(function() {
    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август", "Сентябрь","Октябрь","Ноябрь","Декабрь"],
        dayNamesMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
        firstDay:1,
        dateFormat:"dd.mm.yy"
    });
});

