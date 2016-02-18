MapApp.util = {
  createMap: function(geojson, mapboxToken) {
    var gl = L.mapboxGL({
      accessToken: mapboxToken,
      style: 'mapbox://styles/smharley/cikeotfx300df9um5097xjeer'
    });

    var SLOPE_URL = "http://s3-us-west-1.amazonaws.com/ctslope/relief/{z}/{x}/{y}.png?v=1";
    var USGS_TOPO_URL = "http://s3-us-west-1.amazonaws.com/caltopo/topo/{z}/{x}/{y}.png?v=1";

    var slope = L.tileLayer(SLOPE_URL, {
      attribution: "Slope angle map from <a href='http://caltopo.com/'>CalTopo</a>",
      minZoom: 5,
      maxZoom: 18,
      maxNativeZoom: 14,
      opacity: 0.25,
      zIndex: 10,
    });

    var usgs = L.tileLayer(USGS_TOPO_URL, {
      attribution: "USGS map from <a href='http://caltopo.com/'>CalTopo</a>",
      minZoom: 5,
      maxZoom: 18,
      maxNativeZoom: 14,
      opacity: 0.25
    });

    var map = L.map("map", {
      center: [39.3185, -119.9214],
      layers: [gl],
      maxZoom: 16,
      zoom: 2,
    })

    MapApp.util.addLayer(slope, "Slope", map);
    MapApp.util.addLayer(usgs, "USGS", map);

    // GeoJSON data, popups, and point icons
    var pointIcon = L.icon({
      iconUrl: "<%= asset_path 'marker.svg' %>",
      iconSize: [27, 27],
      popupAnchor: [0, -14]
    });

    var customOptions = {
      "className": "leaflet-popup--custom"
    };

    var geoJsonLayer = L.geoJson(geojson, {
      onEachFeature: function (feature, layer) {
        var customPopup = "<div class='pop'><a href='/places/" +
        feature.properties.href + "'>" +
        "<h2>" + feature.properties.name +
        "</h2></a></div>";
        layer.bindPopup(customPopup, customOptions);
      },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: pointIcon});
      }
    });

    // Mouse Coordinate display
    L.control.coordinates({
      labelTemplateLat:"{y}, ",
      labelTemplateLng:"{x}",
      useLatLngOrder: true,
    }).addTo(map);

    // ClusterGroup
    var markers = L.markerClusterGroup();
    markers.addLayer(geoJsonLayer);
    map.addLayer(markers);

    // Re-center Map on ClusterGroup
    var bounds = markers.getBounds();
    map.fitBounds(bounds);
  },
  addLayer: function (layer, name, map) {
    var $container = $(".layer-nav-items");
    var useName = name.toLowerCase();
    var $item = $("<div>").addClass("layer-nav-item layer-nav-item--" + useName);
    $container.append($item);

    var $link = $("<a href='#'>").text(name).addClass("layer-nav-link").
      data("name", useName);
    $item.append($link);
    var $div = $("<div class='layer-nav-input'>");
    var $input = $("<input id='slide-" + useName +"' type='range' min='0' max='1' step='0.1' value='0.5' />");
    $input.change(function(){ layer.setOpacity(this.value); });
    $div.append($input);
    $item.append($div);

    $link.on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();

      if ($(this).data("name") == useName) {
        if (map.hasLayer(layer)) {
          this.className = 'layer-nav-link';
          map.removeLayer(layer);
        } else {
          map.addLayer(layer);
          this.className = 'layer-nav-link active';
        }
      }
    });
  }
};
