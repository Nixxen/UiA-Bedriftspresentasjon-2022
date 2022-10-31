const initialZoom = 13
const latitude = 58.15
const longitude = 8

var map = L.map("map").setView([latitude, longitude], initialZoom);

// OsmTileLayer
const openStreetMapTileLayerLink = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const openStreetMapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

// OtmTileLayer
const openTopoMapLayerLink = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
const openTopoMapMaxZoom = 17;
const openTopoMapAttribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';

// Google Satelite
const googleSateliteLayerLink = "http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}";
const googleSateliteMaxZoom = 20;
const googleSateliteSubDomains = ["mt0", "mt1", "mt2", "mt3"];

// Google Streets
const googleStreetsLayerLink = "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
const googleStreetsMaxZoom = 20;
const googleStreetsSubDomains = ["mt0", "mt1", "mt2", "mt3"];


/**************************
* Defining the map Layers *
**************************/

var openStreetMap = L.tileLayer(openStreetMapTileLayerLink,
  {
    attribution: openStreetMapAttribution,
  }
);

var openTopoMap = L.tileLayer(openTopoMapLayerLink,
  {
    maxZoom: openTopoMapMaxZoom,
    attribution: openTopoMapAttribution,
  }
);

var googleSatelite = L.tileLayer(googleSateliteLayerLink,
  {
    maxZoom: googleSateliteMaxZoom,
    subdomains: googleSateliteSubDomains,
  }
);

var googleStreets = L.tileLayer(googleStreetsLayerLink,
  {
    maxZoom: googleStreetsMaxZoom,
    subdomains: googleStreetsSubDomains,
  }
);

/***********************
* Adding layers to map *
***********************/
googleStreets.addTo(map);

var baseLayers = {
  OpenStreetMap: openStreetMap,
  Topo: openTopoMap,
  Satellite: googleSatelite,
  GoogleMap: googleStreets,
};

L.control.layers(baseLayers).addTo(map);
