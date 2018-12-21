// JSON stub
$.ajax({
        url: "responses.json",
        type: "GET",
        success: (response) => {
            for (let i = 0; i < response.length; i++) {
                addEntry(response[i].name, response[i].text, response[i].status, i);
            }
        }
});

function Entry (name, text, status, id) {
    this.name = name;
    this.text = text;
    this.status = status;
    this.id = id;
}

Entry.prototype.constructor = Entry;
Entry.ADDED = 0;
Entry.APPROVED = 1;
Entry.DECLINED = 2;
Entry.prototype.getHtml = function () {
    return `
        <div class="response status-${this.status}" id="${this.id}">
            <div class="name"><h2>${this.name}</h2></div>
            <div class="text"><p>${this.text}</p></div>
            <div class="buttons">
            <button class="accepted" onclick="approveEntry(${this.id})">Одобрить</button>
            <button class="denied" onclick="declineEntry(${this.id})">Запретить</button>
            </div> 
        </div>
    `;
}

let formElements = document.getElementById("forma").elements;
let itemCount = 0;
let items = [];

function update () {
    $('#app').empty();
    for (let item of items) {
        $('#app').append(item.getHtml());
    }
}

function addEntry(name, text, status) {
    let i = itemCount++;
    items[i] = new Entry(name, text, status, i);
    update();
}

function comment(event) {
    addEntry(formElements.yourName.value, formElements.yourMessage.value, Entry.ADDED);
}

function approveEntry(id) {
    items[id].status = Entry.APPROVED;
    approve();
    update();

}

function approve() {
 let item = $(this).closest('.response');
    if (item[0] === undefined) {
        return;
    }
    let id = item[0].id;
    $.ajax({
        url: "review.submit.json",
        type: "POST",
        data: {"id_comment": id},
        async: true,
        success: function (data) {
            if (data.result === 1) {
                item.remove();
            } else {
                console.log(data.error_message);
            }
        }
    });
}

function declineEntry(id) {
    items[id].status = Entry.DECLINED;
    decline();
    update();
}

function decline() {
    let item = $(this).closest('.response');
    if (item[0] === undefined) {
        return;
    }
    let id = item[0].id;
    $.ajax({
        url: "review.delete.json",
        type: "POST",
        data: {"id_comment": id},
        async: true,
        success: function (data) {
            if (data.result === 1) {
                item.remove();
            } else {
                console.log(data.error_message);
            }
        }
    });
}

$('.add-comment').on('click', comment);

