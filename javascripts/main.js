Handlebars.registerHelper('dateFormat', function(context, block) {
  if (window.moment) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f); //had to remove Date(context)
  }else{
    return context;   //  moment plugin not available. return data as is.
  };
});

$(function(){
  earthquake_map();

  damages_map();
  damages_table();

});

var earthquake_popup_source = $('#earthquake-popup').html();
var earthquake_popup_template = Handlebars.compile(earthquake_popup_source);

// EARTHQUAKE MAP
function eachEarthQuakeFeature(feature,layer){
  if(feature.properties){
    layer.bindPopup(earthquake_popup_template(feature.properties))
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
// END EARTHQUAKE MAP



// DAMAGES MAP
function damages_map(){

}

// END DAMAGE MAP


// DAMAGES TABLE
function damages_table(){
  $('#damages-table').DataTable({
    ajax: "data/damage_data.json",
    columns: [
      { "title": "District", "data" : "District"},
      { "title": "Population", "data" : "TotalPopulation"},
      { "title": "Dead", "data" : "Dead"},
      { "title": "Injured", "data" : "Injured"},
      { "title": "Gov. Housing Destroyed", "data" : "GovtHousesFullyDestroyed"},
      { "title": "Gov. Housing Damaged", "data" : "GovtHousesPartiallyDestroyed"},
      { "title": "Pub. Housing Destroyed", "data" : "PublicHouseFullyDestroyed"},
      { "title": "Pub. Housing Damaged", "data" : "PublicHousePartiallyDestroyed"}

    ]
  });
}

// END DAMAGES TABLE