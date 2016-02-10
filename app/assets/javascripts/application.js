// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){
  var token = 'pk.eyJ1Ijoic21oYXJsZXkiLCJhIjoiZGJmNDNlODM0MDEyZjRhZDUzNDY0MWI5ZDM3ZGYwMGMifQ.83BsDK5EYkcPnU8SogikqA';

  var map = L.map("map", {
    center: [39.3185, -119.9214],
    maxZoom: 16,
    zoom: 12,
  });

  var gl = L.mapboxGL({
      accessToken: token,
      style: 'mapbox://styles/smharley/cikeotfx300df9um5097xjeer'
  }).addTo(map);

  var markers;

  $.ajax({
    url: '/places',
    dataType: 'json',
    success: function(json) {
      var markers = json;
      makeMarkers(markers);
    }
  });

  function makeMarkers(marks) {
    var markerClusters = L.markerClusterGroup();

    for ( var i = 0; i < marks.length; ++i ) {
      var m = L.marker( [marks[i].lat, marks[i].lng] );
      markerClusters.addLayer( m );
    }

    map.addLayer( markerClusters );
  }
});
// var url = "http://s3-us-west-1.amazonaws.com/caltopo/topo/{z}/{x}/{y}.png?v=1";
// L.tileLayer(url, {
//   attribution: "USGS map from <a href='http://caltopo.com/'>CalTopo</a>",
//   minZoom: 5,
//   maxZoom: 18,
//   maxNativeZoom: 14,
//   opacity: 0.25
// }).addTo(map);

// var url = "http://s3-us-west-1.amazonaws.com/ctslope/relief/{z}/{x}/{y}.png?v=1";
// L.tileLayer(url, {
//   attribution: "USGS map from <a href='http://caltopo.com/'>CalTopo</a>",
//   minZoom: 5,
//   maxZoom: 18,
//   maxNativeZoom: 14,
//   opacity: 0.25
// }).addTo(map);
