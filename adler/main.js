//alert("Hallo Welt!");

const div = document.getElementById ("map");
const breite1 = div.getAttribute ("data-lat1");
const laenge1 = div.getAttribute ("data-lng1");
const titel1 = div.getAttribute ("data-title1");
const breite2 = div.getAttribute ("data-lat2");
const laenge2 = div.getAttribute ("data-lng2");
const titel2 = div.getAttribute ("data-title2");

//console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel);

//Karte initialisieren

let karte = L.map("map");
//console.log(karte);

//auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);

//openstreetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

let pin1 = L.marker (
    [breite1,laenge1]
).addTo(karte);

let pin2 = L.marker (
    [breite2,laenge2]
).addTo(karte);

//popup zum pin hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();

const blick1 ={ 
    kunde: "Wilder Kaiser", 
    standort: "Gruttenhütte", 
    seehoehe: "1640", 
    lat: "47.55564", 
    lng: "12.30444"

};

let pin3 = L.marker(
    [blick1.lat, blick1.lng]
).addTo(karte);

