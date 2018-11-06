$(function () {
    $('#weatherForm').submit(function () {
        $.get('https://yesno.wtf/api', function (data) {
            $('#gifImage').append('<img src="' + data.image + '" />');
        });
        return false;
    });
});
