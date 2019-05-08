

let karte = L.map("map");


const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Datenquelle: Map tiles by <a href="http://stamen.com">, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Datenquelle: Map tiles by <a href="http://stamen.com">, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Datenquelle:  Map tiles by <a href="http://stamen.com">, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.</a>'
    })
};

// Open Streetmap einbauen



kartenLayer.osm.addTo(karte);

L.control.layers({
    "OpenStreetMap": kartenLayer.osm,
    "Geoland Basecamp": kartenLayer.geolandbasemap,
    "Geoland Basemap Overlay": kartenLayer.bmapgrau,
    "Geoland Basemap Grau": kartenLayer.bmapoverlay,
    "Geoland Basemap hidpi": kartenLayer.bmaphidpi,
    "Geoland Basemap Foto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Fläche": kartenLayer.bmapoberflaeche,
    "Stamen Maps Toner": kartenLayer.stamen_toner,
    "Stamen Maps Terrain": kartenLayer.stamen_terrain,
    "Stamen Maps Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);


karte.setView(
 [47.267222,11.392778],
  15
);

//console.log(SPORTSTAETTEN);

//Piktogramme definieren
for (let staette of SPORTSTAETTEN) {
    //console.log(staette);
    let piktogramm = L.icon({
        iconUrl : `icons/icon_${staette.icon}_schwarz_auf_weiss_250px.png`,
        iconSize : 40,
    });

// Marker zeichnen    
    let staettepin = L.marker(
        [staette.lat, staette.lng], {
            icon : piktogramm
        }
    ).addTo(karte);

// Popups hinzufügen
    staettepin.bindPopup(
        `<h2>Name: ${staette.name}</h2>
            <p>Adresse: ${staette.adresse} </p>
            <p><em>Typ: ${staette.typ}</em> <p>
            <em>Gruppe: ${staette.gruppe}</em>`
    );
}





