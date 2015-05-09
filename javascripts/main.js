$(function(){

  earthquake_map();
  

});

function eachEarthQuakeFeature(feature,layer){
  if(feature.properties){
    layer.bindPopup(feature.properties.title)
  }
}
function earthquake_map(){
  var earthquake_map = L.map('earthquake-location-map').setView(
    [28.0, 84.0], 6);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(earthquake_map);

  $.get("data/usgs_earthquake_data.json",function(data){
    L.geoJson(data, {
      onEachFeature: eachEarthQuakeFeature
    }).addTo(earthquake_map);
  });
}