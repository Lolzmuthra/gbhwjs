$(() => {

    let data = {
        cost: 9.99
    };

    // Получение количества участников события
    function getAttendeeCount() {
        return $('.attendee-list .row.attendee').length;
    }

    function addAttendee() {
        $('.attendee-list').append(
            $('template[data-template]').html()
        );

        syncRemoveButtons();
    }

    function syncRemoveButtons() {
        if (getAttendeeCount() === 1) {
            $('.attendee-list .attendee .remove-attendee').first().hide();
        } else {
            $('.attendee-list .attendee .remove-attendee').show();
        }
    }

    function syncPurchaseButton() {
        $('#checkout-button span.amount').html(
            '$' + (data.cost * getAttendeeCount()).toFixed(2)
        );
    }

    // Обработчики событий

    // Событие добавления нового участника
    $('.add-attendee').on('click', (event) => {
        event.preventDefault();
        addAttendee();

        $('#app').trigger('sync');
    });

    $('#app').on('sync', () => {
        syncPurchaseButton();
        syncRemoveButtons();
    });

    // Удаление участника
    $('#app').on('click', '.remove-attendee', function (event) {
        event.preventDefault();
        $(this).closest('.attendee').remove();

        $('#app').trigger('sync');
    });

    // Инициализация формы

    // Крепим цену входного билета
    $('#unit-price').html('$' + data.cost);

    addAttendee();
    syncPurchaseButton();
});
