let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.1533693, lng: 44.4185276},
        zoom: 15
    });

    google.maps.event.addListener(map, 'click', (event) => {
        console.log(event.latLng.lat(), event.latLng.lng());
        addMarker(event.latLng);
    });

    const searchInput = document.getElementById('pac-input');
    const searchBox = new google.maps.places.SearchBox(searchInput);
    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;
        const placeLocation = places[0].geometry.location;
        console.log(placeLocation.lat(), placeLocation.lng());
        addMarker(placeLocation);

        const bounds = new google.maps.LatLngBounds();
        bounds.union(places[0].geometry.viewport);
        map.fitBounds(bounds);
    });
}

function addMarker(location) {
    sendGeocode(location.lat(), location.lng());
    return new google.maps.Marker({
        position: location,
        map: map,
        icon: {
            url: 'https://i.imgur.com/hijJqx6.png',
            scaledSize: new google.maps.Size(50, 50),
        },
    });
}
