const initialZoom = 13
const latitude = 58.15
const longitude = 8

var map = L.map("map").setView([latitude, longitude], initialZoom);

var openStreetMap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }
);

openStreetMap.addTo(map);