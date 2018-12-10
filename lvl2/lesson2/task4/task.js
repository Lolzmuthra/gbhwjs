/*
4. * Создать два статических ответа {result : “success”} и {result: “error”}. В зависимости от каждого из них навесить
на определенный ajax-запрос обработчик результата.
 */

function Reply() {

}

Reply.prototype.constructor = Reply;

Reply.SUCCESS = {result: "success"};
Reply.ERROR = {result: "error"};

let xhr;

if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
    if (window.overrideMimeType) {
        xhr.overrideMimeType('application/json');
    }
} else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        switch (response.result) {
            case Reply.SUCCESS.result:
                console.log("success");
                break;
            case Reply.ERROR.result:
                console.warn("error");
                break;
            default:
                console.error("Ошибка выполнения запроса!");
        }
    }
};
