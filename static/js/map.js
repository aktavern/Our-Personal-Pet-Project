// set global view of map
var mymap = L.map('mapid').setView([30, 0], 1);

// create map using mapbox
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: MAP_API_KEY
}).addTo(mymap);

// for each lat/long, add a marker
d3.json("/charts").then(data => {
    data[3].forEach(coord => L.marker(coord).addTo(mymap))
    console.log(data[3])
});