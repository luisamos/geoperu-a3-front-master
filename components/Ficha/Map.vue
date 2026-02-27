<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "Map",
  props: {
    geojson: {
      type: Object
    }
  },
  data() {
    return {
      map: undefined,
      bounds: L.latLng(L.latLng(-18.854310361889812, -27.371767300523032), L.latLng(-34.62890625000001, 8.098670120603392)),
      geojsong: new L.LayerGroup()
    };
  },
  methods: {
    setupLeafletMap: function() {
      this.map = L.map("mapContainer", {
        zoomControl: false,
        // renderer: L.canvas(),
        center: L.latLng(-9.513, -74.9003),
        minZoom: 4.5,
        zoom: 6,
        doubleClickZoom: false,
        maxBounds: this.bounds,
        maxBoundsViscosity: 1.0
        // zoomAnimation: false
      });
      this.map.setMaxBounds(this.bounds);
    },
    setGeojson(style={}, geojson={}) {
      var jsonLayer = L.geoJSON(geojson, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, style);
        }
      });

      this.geojsong.clearLayers();
      this.geojsong.addLayer(jsonLayer);
      this.map.fitBounds(jsonLayer.getBounds());
    },
    setBaseLayer(url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"){
       L.tileLayer(url, {
        attribution: "",
        maxZoom: 12
      }).addTo(this.map);
    },
    setLayerGroups() {
      this.geojsong.addTo(this.map);
    }
  },
  mounted() {
    this.setupLeafletMap();
    this.setBaseLayer();
    this.setLayerGroups();
   
    
  }
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  min-height: 330px;
}
</style>