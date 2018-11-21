let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.1533693, lng: 44.4185276},
        zoom: 15
    });

    google.maps.event.addListener(map, 'click', (event) => {
        console.log(event.latLng.lat(), event.latLng.lng());
        changeLocationQuery(event.latLng.lat(), event.latLng.lng());
        addMarker(event.latLng);
    });

    const searchInput = document.getElementById('pac-input');
    const searchBox = new google.maps.places.SearchBox(searchInput);
    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;
        const placeLocation = places[0].geometry.location;
        console.log(placeLocation.lat(), placeLocation.lng());
        changeLocationQuery(placeLocation.lat(), placeLocation.lng());
        addMarker(placeLocation);

        const bounds = new google.maps.LatLngBounds();
        bounds.union(places[0].geometry.viewport);
        map.fitBounds(bounds);
    });

    console.log(location.search);
    const locationQuery = location.search.replace('?query=', '');
    const querySplit = locationQuery.split(',');
    const latLng = new google.maps.LatLng(parseFloat(querySplit[0]), parseFloat(querySplit[1]));
    addMarker(latLng);

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(latLng);
    map.fitBounds(bounds);
    google.maps.event.addListenerOnce(map, 'idle', function() {
        if (map.getZoom() > 11) {
            map.setZoom(11);
        }
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

function changeLocationQuery(lat, lng) {
    location.search = `?query=${lat},${lng}`;
}
