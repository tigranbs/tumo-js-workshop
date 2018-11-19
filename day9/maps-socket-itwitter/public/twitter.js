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
        console.log(data);
    });
}
