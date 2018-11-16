$(function () {
    $('#form').submit(function () {
        var a = $("#main").children();
        if (a) {
            a.remove();
        }
        let c = $('input').val();
        $.post('/s', { k: c }, data => {
            console.log(data.search)
            for (var i in data.search) {
                var x = data.search[i].text;
                var y = data.search[i].user.name;
                $('#main').append("<div><h1>" + y + "</h1>" + "<p>" + x + "</p>" + "</div>")
            }
        })
        return false;
    })
});
