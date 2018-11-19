function sendGeocode(lat, lng) {
    $.post('/search', { lat, lng }, data => {});
}
