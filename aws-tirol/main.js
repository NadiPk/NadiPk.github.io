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

//console.log(AWS);

async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            //console.log("Layer ", layer);
            const date = new Date(layer.feature.properties.date);
            console.log("Datum: ", date);
            return `<h4>Name: ${layer.feature.properties.name}</h4> <br>
            Temperatur: ${layer.feature.properties.LT} °C <br>
            Höhe: ${layer.feature.geometry.coordinates[2]} m <br>
            Datum: ${date.toLocaleDateString("de-AT")}
                ${date.toLocaleTimeString("de-AT")} <br>
            Windgeschwindigkeit: ${layer.feature.properties.WG ? layer.feature.properties.WG + " km/h": "keine Daten"}
            <hr>
            <footer> Quelle: Land Tirol - <a href="https://www.data.gv.at"> data.tirol.gv.at </a></footer>`;
        }) //Popups erstellen
        .addTo(awsTirol);
    //awsTirol.addTo(karte);
    karte.fitBounds(awsTirol.getBounds()); //Zoom auf die Pins
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");

    // Windrichtung anzeigen
    const windLayer = L.featureGroup();
    const windgPalette = [
        [3.60, "#05B603"], //<3
        [8.23, "#0ECE24"], //3-4
        [11.32, "#73D36F"], //4-5
        [14.40, "#FBD8D3"], //6
        [17.49, "#FFB4B3"], //7
        [21.09, "#FF9F9D"], //8
        [24.69, "#FF8281"], //9
        [28.81, "#FE5F61"], //10
        [32.96, "#FE4341"], //11
        [999, "#FF1F0E"], //>11
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = windgPalette[windgPalette.length - 1][1];
                for (let i = 0; i < windgPalette.length; i++) {
                    if (feature.properties.WG < windgPalette[i][0]) {
                        color = windgPalette[i][1];
                        break;
                    } else {}
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style= "color: ${color}; transform:rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-3x"></i>`
                    })
                });
            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    windLayer.addTo(karte)

    // Temperatur Layer hinzufügen
    const tempLayer = L.featureGroup();
    const tempPalette = [
        [-20, "#6B655F"], //<-20
        [-10, "#732E75"], //-20 bis -10
        [0, "#3701DA"], //-10 bis 0
        [10, "#007800"], //0 bis 10
        [20, "#FCFE05"], //10 bis 20
        [30, "#F77700"], //20 bis 30
        [40, "#F20205"], //30 bis 40        
        [99, "730405"], //>40
    ];
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                let color = tempPalette[tempPalette.length - 1][1];
                for (let i = 0; i < tempPalette.length; i++) {
                    console.log(tempPalette[i], feature.properties.LT);
                    if (feature.properties.LT < tempPalette[i][0]) {
                        color = tempPalette[i][1]
                        break;
                    } else {}
                }
                // let color = 'blue';                      erster Farbverlaufversuch
                //if (feature.properties.LT > 0) {
                //    color = 'red';
                //}
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="tempLabel"; style="background-color: ${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(tempLayer);
    layerControl.addOverlay(tempLayer, "Temperatur in °C");
    tempLayer.addTo(karte)

    // Relative Feuchte Layer hinzufügen
    const feuchtLayer = L.featureGroup();
    const feuchtPalette = [
        [30, "#F0EEF2"],
        [40, "#DBDEDB"],
        [50, "#C4C9C8"],
        [60, "#BCBDBE"],
        [70, "#ABA9D1"],
        [80, "#9D95DE"],
        [90, "#8B85EC"],
        [999, "#7677E4"],
    ];
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.RH) {
                let color = feuchtPalette[feuchtPalette.length - 1][1];
                for (let i = 0; i < feuchtPalette.length; i++) {
                    console.log(feuchtPalette[i], feature.properties.RH);
                    if (feature.properties.RH < feuchtPalette[i][0]) {
                        color = feuchtPalette[i][1]
                        break;
                    } else {}
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="feuchtLabel" style="background-color:${color}">${feature.properties.RH}</div>`
                    })
                });
            }
        }
    }).addTo(feuchtLayer);
    layerControl.addOverlay(feuchtLayer, "Relative Feuchte in %");
    //feuchtLayer.addTo(karte)

    //Schneehöhen (eigner Farbverlauf)
    const schneeLayer = L.featureGroup();
    const schneePalette = [
        [10, "#e4e6e4"],
        [20, "#ffad00"],
        [30, "#00bc02"],
        [50, "#007800"],
        [75, "#00cdff"],
        [100, "#3800d1"],
        [150, "#b123b0"],
        [200, "#fdf200"],
        [250, "#ff7800"],
        [300, "#f0f"],
        [400, "#772d76"],
        [9999, "#646664"],
    ]

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.HS) {
                if (feature.properties.HS >= 0) {
                    let color = schneePalette[schneePalette.length - 1][1];
                    for (let i = 0; i < schneePalette.length; i++) {
                        console.log(schneePalette[i], feature.properties.HS);
                        if (feature.properties.RH < schneePalette[i][0]) {
                            color = schneePalette[i][1]
                            break;
                        } else {}
                    }
                    return L.marker(latlng, {
                        icon: L.divIcon({
                            html: `<div class="schneeLabel" style= "background-color: ${color}"> ${feature.properties.HS}</div>`
                        })

                    });
                }
            }
        }
    }).addTo(schneeLayer);
    layerControl.addOverlay(schneeLayer, "Schneehöhe in cm")
    //feuchtLayer.addTo(karte)
}




loadStations();