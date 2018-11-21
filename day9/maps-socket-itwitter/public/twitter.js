const socket = io.connect();
socket.on('accepted', data => {
    if (data.status === 'ok') {
        console.log('Connected!!');
    } else {
        console.log('Rejected!!');
    }
});

function sendGeocode(lat, lng) {
    socket.emit('geocode', { lat, lng });
    socket.on(`${lat},${lng}`, data => {
        data.statuses.map(status =>  {
            console.log(status);
            const text = status.text;
            const name = status.user.name;
            const img_url = status.user.profile_image_url;
            const img = `<div class="image_twitter"><img src="${img_url}"/></div>`;
            $('#main').append("<div class='block_divs'><h1>" + name + "</h1>" + img + "<p>" + text + "</p>" + "</div>")
        });
    });
}
