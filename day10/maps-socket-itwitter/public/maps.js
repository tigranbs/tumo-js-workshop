let map;
const mapMarkers = {};
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

    const latLngArray = getUrlLocation();
    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < latLngArray.length; i++) {
        console.log(latLngArray[i].lat);
        console.log(latLngArray[i].lng);
        const latLng = new google.maps.LatLng(parseFloat(latLngArray[i].lat), parseFloat(latLngArray[i].lng));
        addMarker(latLng);
        bounds.extend(latLng);
    }

    map.fitBounds(bounds);
    google.maps.event.addListenerOnce(map, 'idle', function() {
        if (map.getZoom() > 11) {
            map.setZoom(11);
        }
    });
}

function addMarker(location) {
    const lat = location.lat();
    const lng = location.lng();
    sendGeocode(lat, lng);
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: {
            url: 'https://i.imgur.com/hijJqx6.png',
            scaledSize: new google.maps.Size(50, 50),
        },
    });
    mapMarkers[`${lat},${lng}`] = marker;
    marker.addListener('click', function() {
        $('#main').toggleClass('active');
        marker.setIcon({
            url: 'https://i.imgur.com/hijJqx6.png',
            scaledSize: new google.maps.Size(50, 50),
        });
    });
}

function changeMarkerIcon(lat, lng) {
    const marker = mapMarkers[`${lat},${lng}`];
    if (!marker) return;
    marker.setIcon({
        url: 'http://icons-for-free.com/free-icons/png/512/2246847.png',
        scaledSize: new google.maps.Size(50, 50),
    });
}

function getUrlLocation() {
    const locationQuery = decodeURI(location.search.replace('?query=', ''));
    console.log(locationQuery);
    try {
        return JSON.parse(locationQuery);
    } catch (e) {
        return [];
    }
}

function changeLocationQuery(lat, lng) {
    const latLngs = getUrlLocation();
    latLngs.push({
        lat: lat,
        lng: lng,
    });
    window.history.pushState("", "",
        `/?query=${JSON.stringify(latLngs)}`);
}
