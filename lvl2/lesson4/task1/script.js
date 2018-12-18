$(function TabText() {
    $('.tabs-header li').on('click', function () {
        $('.tabs-content').hide().eq($(this).index()).show();
    })
});
