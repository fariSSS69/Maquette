import React from 'react';
import { WebView } from 'react-native-webview';

const HEREMap = ({ coordinates }) => {
  const hereApiKey = '2eqklE5jQWLHnHIkOygMkE5hgiE-jTcyV4liJwNQsok';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
      <style>html, body { margin: 0; padding: 0; height: 100%; }</style>
    </head>
    <body>
      <div style="width: 100%; height: 100%" id="mapContainer"></div>
      <script>
        var platform = new H.service.Platform({
          apikey: '${hereApiKey}'
        });
        var defaultLayers = platform.createDefaultLayers();
        var map = new H.Map(document.getElementById('mapContainer'), defaultLayers.raster.terrain.map);
        
        var mapEvents = new H.mapevents.MapEvents(map);
        var behavior = new H.mapevents.Behavior(mapEvents);
        var ui = H.ui.UI.createDefault(map, defaultLayers);

        var routeLineString = new H.geo.LineString();
        ${coordinates.map(coord => `routeLineString.pushPoint({ lat: ${coord.latitude}, lng: ${coord.longitude} });`).join('')}
        
        var routePolyline = new H.map.Polyline(routeLineString, {
          style: { lineWidth: 4, strokeColor: 'rgba(255, 0, 0, 0.7)' }
        });
        map.addObject(routePolyline);
        
        // Calculer les limites géographiques du trajet pour centrer la carte sur le parcours complet
        var routeBoundingBox = routeLineString.getBoundingBox();
        map.getViewModel().setLookAtData({
          bounds: routeBoundingBox
        });
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
    />
  );
};

export default HEREMap;
