//alert("Hallo Welt!");

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");

//console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel);

//Karte initialisieren

let karte = L.map("map");
//console.log(karte);

//auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),

    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer(" https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design </a>',
    }),
    stamen_terrain: L.tileLayer(" https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design </a>,'
    }),
    stamen_watercolor: L.tileLayer(" https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design </a>,'
    })

};

//openstreetmap einbauen

//kartenLayer.osm.addTo(karte);
//kartenLayer.geolandbasemap.addTo(karte);
//kartenLayer.bmapoverlay.addTo(karte);
//kartenLayer.bmapgrau.addTo(karte);
//kartenLayer.bmaphidpi.addTo(karte);
//kartenLayer.bmaporthofoto30cm.addTo(karte);
//kartenLayer.bmapgelaende.addTo(karte);
//kartenLayer.bmapoberflaeche.addTo(karte);
//kartenLayer.stamen_toner.addTo(karte);
kartenLayer.stamen_terrain.addTo(karte);
//kartenLayer.stamen_watercolo.addTo(karte);


karte.addControl(new L.Control.Fullscreen());
var hash = new L.Hash(karte);
var coords = new L.Control.Coordinates();
coords.addTo(karte);
coords.addTo(karte);

karte.on('click', function (e) {
    coords.setCoordinates(e);
});



/*L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(karte);

L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
}).addTo(karte);*/

let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);

let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

//popup zum pin hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();

/*const blick1 ={ 
    kunde: "Wilder Kaiser", 
    standort: "Gruttenhütte", 
    seehoehe: "1640", 
    lat: "47.55564", 
    lng: "12.30444" /*

};

/*let pin3 = L.marker(
    [blick1.lat, blick1.lng]
).addTo(karte);
pin3.bindPopup(
    `<h1>Standort ${blick1.kunde}</h1>
    <p>Höhe: ${blick1.seehoehe} m</p>
    <em>Kunde: ${blick1.kunde}</em>`
    );*/


/* const blick2 ={ 
     kunde: "Bergbahn Scheffau", 
     standort: "Brandstadl", 
     seehoehe: "1640", 
     lat: "47.4912", 
     lng: "12.248" 
 
 };*/

/*let pin4 = L.marker(
    [blick2.lat, blick2.lng]
).addTo(karte);
pin3.bindPopup(
    `<h1>Standort ${blick2.kunde}</h1>
    <p>Höhe: ${blick2.seehoehe} m</p>
    <em>Kunde: ${blick2.kunde}</em>`
    );*/


/*const blick3 ={ 
    kunde: "Lechtal Tourismus", 
    standort: "Sonnalm Jöchelspitze", 
    seehoehe: "1784", 
    lat: "47.27528", 
    lng: "10.36505"
/*const blick3 ={ 
            kunde: "Lechtal Tourismus", 
            standort: "Sonnalm Jöchelspitze", 
            seehoehe: "1784", 
            lat: "47.27528", 
            lng: "10.36505"
        
        };
};*/

/*let pin5 = L.marker(
    [blick3.lat, blick3.lng]
).addTo(karte);
pin3.bindPopup(
    `<h1>Standort ${blick3.kunde}</h1>
    <p>Höhe: ${blick3.seehoehe} m</p>
    <em>Kunde: ${blick3.kunde}</em>`
    ); */

//vereinfacht
let blickeGruppe = L.featureGroup().addTo(karte);

for (let blick of ADLERBLICKE) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1>Standort ${blick.kunde}</h1>
            <p>Höhe: ${blick.seehoehe} m</p>
            <em>Kunde: ${blick.kunde}</em>`

    )
}

console.log(blickeGruppe.getBounds());
karte.fitBounds(blickeGruppe.getBounds());

//gpx track laden & marker laden
new L.GPX("AdlerWegEtappe05.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }


}).on('loaded', function (e) {
    karte.fitBounds(e.target.getBounds());
//const statsDiv = document.getElementById("stats");
//const minHeight = e.target.get_elevation_min();
//const maxHeight = e.target.get_elevation_max();
//const verticalMeters = e.target.get_elevation_gain();
const minSpan = document.getElementById('min');
const maxSpan = document.getElementById('max');
const diffSpan = document.getElementById('diff');
minSpan.innerHTML = e.target.get_elevation_min();
maxSpan.innerHTML = e.target.get_elevation_max();
diffSpan.innerHTML = e.target.get_elevation_gain();
//statsDiv.innerHTML = `Routen Statistik: niedrigster Punkt: ${minHeight} m
//höchster Punkt: ${maxHeight} m, Höhenunterschied: ${verticalMeters} m`;
}).on('addline', function (e) {
    console.log('line geladen')
    const controlElevation = L.control.elevation({
        position: "bottomright",
        collapsed: true,
        detachedView: false,

        // detachedView: true,
        // elevationDiv: "#elevation-div",
    });
    controlElevation.addTo(karte);
    controlElevation.addData(e.line);
    const gpxLinie = e.line.getLatLngs();
    console.log(gpxLinie);
    for (let i = 1; i < gpxLinie.length; i += 1) {
        // console.log(gpxLinie[i]);
        let p1 = gpxLinie[i - 1];
        let p2 = gpxLinie[i];
        let dist = karte.distance(
            [p1.lat, p1.lng],
            [p2.lat, p2.lng]
        );

        let delta = (p2.meta.ele - p1.meta.ele);
        let proz = (dist != 0 ? delta / dist * 100.0 : 0).toFixed(1); //toFiex = Runden auf eine Nachkommastelle
        console.log('Distanz: ', dist, 'Höhendiff:', delta, 'Steigung', proz);
        let farbe =
            proz >= 10 ? "#feebe2" :
            proz >= 6 ? "#fcc5c0" :
            proz >= 2 ? "#fa9fb5" :
            proz >= 0 ? "#f768a1" :
            proz >= -6 ? "#dd3497" :
            proz >= -10 ? "#ae017e" :
            "#7a0177";

        //['#feebe2','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177']
        L.polyline(
            [
                [p1.lat, p1.lng],
                [p2.lat, p2.lng],
            ], {
                color: farbe,
            }
        ).addTo(karte);
    }

});