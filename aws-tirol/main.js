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



kartenLayer.geolandbasemap.addTo(karte);

const layerControl = L.control.layers({
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
    [47.267222, 11.392778],
    15
);



//console.log (AWS);

const awsTirol = L.featureGroup();
async function loadStations() {
        const response = await fetch("https://aws.openweb.cc/stations");
        const stations = await response.json();
        L.geoJson(stations)
            .bindPopup(function (layer) {
                //console.log("Layer: ", layer);
                const date = new Date(layer.feature.properties.date);
                console.log("Datum", date);
                return `<h4>${layer.feature.properties.name}<h4>
    Höhe: ${layer.feature.geometry.coordinates[2]} m<br>
    Temperatur: ${layer.feature.properties.LT} °C <br>
    Datum: ${date.toLocaleDateString("da-AT")}
    ${date.toLocaleTimeString("da-AT")} <br>
    Windgeschwindigkeit (km/h):
     ${layer.feature.properties.WG ? layer.feature.properties.WG : 'keine Daten' }
     Relative Feuchte: 
     ${layer.feature.properties.RH ? layer.feature.properties.RH + '%' : 'keine Daten'}
     <hr>
     <footer>Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at </a></footer>
     `;

                //Windgeschwindigkeit 


                const windfarbeLayer = L.featureGroup();
                const windfarbPalette = [
                    [19, "#00b900"],
                    [28, "#10cd24"],
                    [38, "#72d475"],
                    [49, "#fed6d3"],
                    [61, "#ffb6b3"],
                    [74, "#ff9e9a"],
                    [88, "#ff8281"],
                    [102, "#ff6160"],
                    [117, "#ff453c"],
                    [500, "#ff200e"],
                ];

            })
            .addTo(awsTirol);
        karte.fitBounds(awsTirol.getBounds());
        layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");
        //windrichtung anzeigen
        const windLayer = L.featureGroup();
        L.geoJson(stations, {
            pointToLayer: function (feature, latlng) {
                if (feature.properties.WR) {
                    let color = 'black';
                    if (feature.properties.WG > 20) {
                        color = 'red';

                    }
                    return L.marker(latlng, {
                        icon: L.divIcon({

                            html: `<i style = "color: ${color};transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-up fa-2x"></i>`
                        })


                    });


                }

            }
        }).addTo(windLayer);
        layerControl.addOverlay(windLayer, "Windrichtung");
        windLayer.addTo(karte);

        //Feuchtelayer

        const feuchtelayer = L.featureGroup();
        const feuchtefarbPalette = [
            [30, "#EEE"],
            [40, "#DDD"],
            [50, "#C6C9CE"],
            [60, "#BBB"],
            [70, "#AAC"],
            [80, "#9998DD"],
            [90, "#8788EE"],
            [100, "#7677E1"],
        ];

        //Relative Feuchte Anezeigen
        const feuchteLayer = L.featureGroup();
        L.geoJson(stations, {
                pointToLayer: function (feature, latlng) {(
                    /*if (feature.properties.RH) {
                        let color = 'black';
                        if (feature.properties.RH > 20) {
                            color = 'red';*/

                    if (feature.properties.LT) 
                        let color = 'red';
                        for (let i = 0; i < farbPalette.length; i++) {
                            console.log(farbPalette[i], feature.properties.LT);
                            if (feature.properties.LT < farbPalette[i][0]) {
                                color = farbPalette[i][1];
                                break;

                            }
                            return L.marker(latlng, {
                                icon: L.divIcon({
                                    html: `<div class = "feuchteLabel" style="background-color: ${color}">${feature.properties.RH}`
                                })


                            });


                        }

                    }
                }).addTo(feuchteLayer); layerControl.addOverlay(feuchteLayer, "relative Feuchte"); feuchteLayer.addTo(karte);

            /*   const temperaturLayer = L.featureGroup();
    const farbPalette = [
        [0,"blue"],
        [1, "yellow"],
        [5, "orange"],
        [2, "red"],
    ];
*/


            const temperaturLayer = L.featureGroup();
            const farbPalette = [
                [-28, "#646664"],
                [-26, "#8c8a8c"],
                [-24, "#b4b2b4"],
                [-22, "#cccecc"],
                [-20, "#e4e6e4"],
                [-18, "#772d76"],
                [-16, "#b123b0"],
                [-14, "#d219d1"],
                [-12, "#f0f"],
                [-10, "#ff94ff"],
                [-8, "#3800d1"],
                [-6, "#325afe"],
                [-4, "#2695ff"],
                [-2, "#00cdff"],
                [0, "#00fffe"],
                [2, "#007800"],
                [4, "#009d00;"],
                [6, "#00bc02"],
                [8, "#00e200"],
                [10, "#0f0"],
                [12, "#fcff00"],
                [14, "#fdf200"],
                [16, "#fde100;"],
                [18, "#ffd100"],
                [20, "#ffbd00"],
                [22, "#ffad00"],
                [24, "#ff9c00"],
                [26, "#ff7800"],
                [28, "red"],
                [30, "#f30102"],
                [32, "#d20000"],
                [34, "#c10000"],
                [36, "#b10000"],
                [38, "#a10000"],
                [40, "#900000"],
                [42, "#770100"],
                [44, "#5f0100"],
                [46, "#460101"],
                [48, "#2e0203"],
            ];





            //

            L.geoJson(stations, {
                pointToLayer: function (feature, latlng) {
                    if (feature.properties.LT) {
                        let color = 'red';
                        for (let i = 0; i < farbPalette.length; i++) {
                            console.log(farbPalette[i], feature.properties.LT);
                            if (feature.properties.LT < farbPalette[i][0]) {
                                color = farbPalette[i][1];
                                break;
                                //  }
                                //let color = 'blue';
                                //if (feature.properties.LT > 0) {
                                //  color = 'red';
                            }
                        }
                        return L.marker(latlng, {
                            icon: L.divIcon({
                                html: `<div class = "temperaturLabel" style="background-color: ${color}">${feature.properties.LT}`

                            })


                        });


                    }

                }
            }).addTo(temperaturLayer); layerControl.addOverlay(temperaturLayer, "Temperatur"); temperaturLayer.addTo(karte);


        }

        loadStations()

        //const awsTirol = L.featureGroup();
        //L.geoJson(AWS)
        //.bindPopup(function(layer){
        //    console.log("Layer: ", layer)
        //   return `Temperatur: ${layer.feature.properties.LT} °C <br>
        // Datum: ${layer.feature.properties.date}`;
        //}) 
        //.addTo(awsTirol);
        //awsTirol.addTo(karte);
        //karte.fitBounds(awsTirol.getBounds()); 