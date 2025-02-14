<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map Marker</title>
</head>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
crossorigin=""></script>
<style>
    #map { height: 500px;  }
</style>
<body>
    <div id="map"></div>
    <script src="./02febpointData.geojson"></script>
    <script>

var cLat = 35.82941
var cLon = -79.09997

var polksLand = [cLat,cLon];

var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'})
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#7BAFD4",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var marker = L.marker(polksLand.bindPopup("<b>Polks Landing </b>")
var polksLandMarker = L.circleMarker(polksLand,geojsonMarkerOptions).addTo(map);
var longitudeWpt0 = waypoints.features[0].geometry.coordinates[0]
var latitudeWpt0 = waypoints.features[0].geometry.coordinates[1]


var waypoints = L.geoJSON(waypoints).addTo(map);
var myCircles = L.geoJSON(waypoints, {
    pointToLayer: function (feature, latlng) {
      //console.log(feature)
        return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.note )
    }
}).addTo(map);
myFeatures = waypoints.features.map(e => e)

var baseLayers = {
    "OpenStreetMap": OSM,
    "ESRI": Esri_WorldImagery
    };
var overlayMaps = {
        'My vector': myCircles,
        'my_first_waypoint': marker,
        'Carolina Hall': carolinaHallMarker
    };
var layerControl = L.control.layers(baseLayers,overlayMaps).addTo(map);

// here I am creating an empty variable
var daEvent;
// here I am creating a empty leaflet popup object using the .popup() method
var popup = L.popup();

// this is a function that receives one parameter that we have named e 
// in js we often name events something like e, evt, ev, or event. 
function onMapClick(e) {
    daEvent = e // here I am assigning the value e to daEvent so we can access/use/discuss it later. 
    /console.log(e) // printing e in the console.log
    popup
        .setLatLng(e.latlng) // setting the lat long to the popup object
        .setContent("You clicked the map at " + e.latlng.toString() + " and at Zoom " + e.sourceTarget._zoom) // making a popup with text based on values of e.
        .openOn(map);// placing the popup in the map. 
}

map.on('click', onMapClick); // creating a leaflet event listener
// it will listen for click events and when a click happens the function onMapClick will be called. 
// JS has the particularity that event listeners automatically pass the argument of the event to the function
// so in this case you do not have to write onMapClick(e), in fact that would not work.... i know this is weird. 
</script>

</body>
</html>