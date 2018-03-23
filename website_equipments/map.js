// Map ------------------

// Put your accessToken
mapboxgl.accessToken = 'pk.eyJ1IjoiZmxvaGF0MzIiLCJhIjoiY2o1aWhnaXhjMXh6bzMzb2RlamR5N3lxZCJ9.wu2JL5mP4H5eFeDxpmrxNQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [2.3362,48.8566],
    zoom: 11.5,
    minZoom: 0,
    maxZoom: 17,
    boxZoom:false,
});

map.addControl(new mapboxgl.NavigationControl(),"top-left");

function switchLayer(layerId) {
    map.setStyle('mapbox://styles/'+layerId)
}



// Create markersImg and markers---
const icon_size = "40";
const markersImg = {};
const markers = {};

Object.keys(equipments).forEach(function(id){
    markersImg[id] = document.createElement("img")
    markersImg[id].className = 'marker';
    markersImg[id].src = state_png[equipments[id]['cat']][equipments[id]["state"]];
  	markersImg[id].width = icon_size;
  	markersImg[id].height = icon_size;

    const popupContent = "<a target='_blank' href='"+
                         equipments[id]["websiteUrl"]+"'>"+"<b><u> " +
                         equipments[id]["name"] + ": </u> </b> </a>"+
                         "<br><br><b>Adress: </b>"+equipments[id]["address"]+", "+equipments[id]["zipCode"]+
                         "<br><a target='_blank' href='https://www.google.com/maps/dir/?api=1&destination="+
                                              equipments[id]["address"]+", "+equipments[id]["city"]+"'>"+"<b> " +
                                              "Go </b> </a>";

    const popup = new mapboxgl.Popup({closeButton:false,closeOnClick:true})
                  .setHTML(popupContent);

  	markers[id] = new mapboxgl.Marker(markersImg[id])
                  .setLngLat({'lng':equipments[id]['lon'],'lat':equipments[id]['lat']})
                  .setPopup(popup);
    markers[id].addTo(map);
})
