const initialZoom = 13;
const latitude = 58.146;
const longitude = 7.998;
// Map
var map = L.map("map").setView([latitude, longitude], initialZoom);

// OsmTileLayer
const openStreetMapTileLayerLink =
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const openStreetMapAttribution =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

// OtmTileLayer
const openTopoMapLayerLink = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
const openTopoMapMaxZoom = 17;
const openTopoMapAttribution =
  'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';

// Norkart API key
const apiKey = ""; // User your own key from https://developer.norkart.no/

/**************************
 * Defining the map Layers *
 **************************/
var openStreetMap = L.tileLayer(openStreetMapTileLayerLink, {
  attribution: openStreetMapAttribution,
});

var openTopoMap = L.tileLayer(openTopoMapLayerLink, {
  maxZoom: openTopoMapMaxZoom,
  attribution: openTopoMapAttribution,
});

var norkartLite = L.tileLayer.webatlas({
  mapType: L.TileLayer.Webatlas.Type.LITE,
  apikey: apiKey,
});

var norkartHybrid = L.tileLayer.webatlas({
  mapType: L.TileLayer.Webatlas.Type.HYBRID,
  apikey: apiKey,
});

var norkartAerial = L.tileLayer.webatlas({
  mapType: L.TileLayer.Webatlas.Type.AERIAL,
  apikey: apiKey,
});

/** All available Norkart map types
L.TileLayer.Webatlas.Type.GREY
L.TileLayer.Webatlas.Type.VECTOR
L.TileLayer.Webatlas.Type.MEDIUM
L.TileLayer.Webatlas.Type.LITE
L.TileLayer.Webatlas.Type.AERIAL
L.TileLayer.Webatlas.Type.HYBRID
*/

/***********************************
 * Async henting av geojson *
 ***********************************/
async function getGeojson(path) {
  return fetch(path).then((response) => response.json());
}

/***********************************
 * Setting up a marker with a popup *
 ***********************************/
// const myMarkersGEOJSON = await getGeojson("data/myMarkers.geojson");
// var myMarkers = L.geoJSON(myMarkersGEOJSON, {
//   onEachFeature: function (feature, layer) {
//     layer.bindPopup(
//       "<h4>" +
//         feature.properties.name +
//         "</h4>" +
//         "<p>" +
//         feature.properties.popupContent +
//         "</p>"
//     );
//   },
// }).addTo(map);

// const barsInNorwayGEOJSON = await getGeojson("data/barsNorway.geojson");
// var markersBarsInNorway = L.geoJSON(barsInNorwayGEOJSON, {
//   onEachFeature: function (feature, layer) {
//     var popupcontent = [];
//     for (var prop in feature.properties) {
//       if (prop != "@id") {
//         popupcontent.push(prop + ": " + feature.properties[prop]);
//       }
//     }
//     layer.bindPopup(popupcontent.join("<br />"));
//   },
// }).addTo(map);

/****************
 * Adding circle *
 ****************/
// const myPointGEOJSON = await getGeojson("data/myPoint.geojson");
// var circles = L.featureGroup();
// L.geoJSON(myPointGEOJSON, {
//   onEachFeature: function (feature, layer) {
//     var latlng = feature.geometry.coordinates;
//     L.circle([latlng[1], latlng[0]], {
//       radius: feature.properties.radius,
//     }).addTo(circles);
//   },
// });
// circles.addTo(map);

/*************************
 * Adding line with popup *
 *************************/
// const uiaDistanceGEOJSON = await getGeojson("data/universityUiA.geojson");
// var uiaDistance = L.geoJSON(uiaDistanceGEOJSON, {
//   onEachFeature: function (feature, layer) {
//     var distance = feature.geometry.coordinates;
//     var latlng1 = L.latLng(distance[0][1], distance[0][0]);
//     var latlng2 = L.latLng(distance[1][1], distance[1][0]);
//     var distanceInMeters = Math.round(latlng1.distanceTo(latlng2));
//     layer.bindPopup(
//       "<h4>" +
//         feature.properties.description +
//         "</h4>" +
//         "<p>Distance: " +
//         distanceInMeters +
//         "m</p>"
//     );
//   },
// }).addTo(map);

// const uiaKrsGEOJSON = await getGeojson("data/uiaKrsPolygon.geojson");
// var uiaKrs = L.geoJSON(uiaKrsGEOJSON).addTo(map);

/***********************
 * Adding a draw plugin *
 ***********************/

// var drawItems = new L.FeatureGroup();
// map.addLayer(drawItems);
// var drawControl = new L.Control.Draw({
//   edit: {
//     featureGroup: drawItems,
//   },
// });
// map.addControl(drawControl);

// map.on("draw:created", function (event) {
//   var layer = event.layer,
//     feature = (layer.feature = layer.feature || {});
//   feature.type = feature.type || "feature";
//   var props = (feature.properties = feature.properties || {});
//   drawItems.addLayer(layer);
// });

/**************************
 * 52 pick-up, marker game *
 **************************/
let radius = 0;
const metersToLatOrLng = (meters) => {
  // Probably not accurate, but they end up roughly where I want them to 😅
  var latOrLng = meters / 111111;
  return latOrLng;
};
let lat = 0;
let lng = 0;
let counter = 0;
//Display countr on map next to deck of cards.
var counterDiv = L.DomUtil.create("div", "counter");
const deckOfCardsGEOJSON = await getGeojson("data/deckOfCards.geojson");
var deckOfCards = L.geoJSON(deckOfCardsGEOJSON, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(
      "<h4>" +
        feature.properties.name +
        "</h4>" +
        "<p>" +
        feature.properties.popupContent +
        "</p>"
    );
    radius = feature.properties.radius;
    lat = feature.geometry.coordinates[1];
    lng = feature.geometry.coordinates[0];
    counter = 52;
  },
}).addTo(map);

function spawnCards() {
  // Spawn 52 card markers in a radius of deckOfCards.radius, delete them on click
  // Tag card 0 as ace of spades
  console.log("Radius is :", radius);
  var markers = L.featureGroup();
  var markersArray = [];
  for (var i = 0; i < 52; i++) {
    console.log("i is :", i);
    var randomAngle = Math.random() * 2 * Math.PI;
    var randomRadius = Math.random() * radius;
    var randomX = randomRadius * Math.cos(randomAngle);
    var randomY = randomRadius * Math.sin(randomAngle);
    var randomLat = metersToLatOrLng(randomY) + lat; // Because meters and latlng are funky
    var randomLng = metersToLatOrLng(randomX) + lng;
    var marker = L.marker([randomLat, randomLng]);
    // Save the index to the marker
    marker.index = i;
    marker.lat = randomLat;
    marker.lng = randomLng;
    marker.on("click", function (e) {
      counter--;
      //   console.log("I is :", this.index);
      if (this.index == 0) {
        // Display popup
        var popup = L.popup()
          .setLatLng([this.lat, this.lng])
          .setContent("You found the Ace of Spades!")
          .openOn(map);

        // Remove popup after 5 seconds
        setTimeout(function () {
          map.closePopup(popup);
        }, 5000);
      } else {
        var popup = L.popup()
          .setLatLng([this.lat, this.lng])
          .setContent(counter + " to go")
          .openOn(map);
        setTimeout(function () {
          map.closePopup(popup);
        }, 300);
      }
      e.target.remove();
    });
    markers.addLayer(marker);
    markersArray.push(marker);
  }
  markers.addTo(map);
}

deckOfCards.on("click", function (e) {
  spawnCards();
});

/***************************************
 * Setting up the map and adding layers *
 ***************************************/
norkartAerial.addTo(map);

var baseLayers = {
  OpenStreetMap: openStreetMap,
  Topo: openTopoMap,
  NorkartLite: norkartLite,
  NorkartHybrid: norkartHybrid,
  NorkartAerial: norkartAerial,
};

var overlays = {
  //   Markers: myMarkers,
  //   BarsInNorway: markersBarsInNorway,
  //   Circles: circles,
  //   UiADistance: uiaDistance,
  //   DrawnElements: drawItems,
  DeckOfCards: deckOfCards,
};

L.control.layers(baseLayers, overlays).addTo(map);
