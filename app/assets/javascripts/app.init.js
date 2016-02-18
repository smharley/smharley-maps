MapApp.init = {
  initializeMap: function(mapboxToken) {
    if ($("#map").length) {
      $.ajax({
        url: '/places.json',
        dataType: 'text',
        success: function(data) {
          geojson = $.parseJSON(data);
          MapApp.util.createMap(geojson, mapboxToken);
        }
      });
    }
  },
};
