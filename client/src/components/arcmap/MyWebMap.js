import React, { useEffect, useRef } from "react";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Multipoint from "@arcgis/core/geometry/Multipoint";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";

export default function MyWebMap({ placeList, mapStyles }) {
  const mapDiv = useRef(null);
  const defaultCenter = {
    lat: placeList.length ? placeList[0].lat : 0,
    lng: placeList.length ? placeList[0].lng : 0,
  };

  useEffect(() => {
    if (mapDiv.current) {
      esriConfig.portalUrl = "https://jpstupfel.maps.arcgis.com";


      const map = new WebMap({
        portalItem: {
          // autocasts as new PortalItem()
          id: "480baf2adf9947ed9a32d2873b0421be",
        },
      });

      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [defaultCenter.lng, defaultCenter.lat],
        zoom: 7,
      });

      const pointFeature = placeList.map((e) => {
        const westLng = e.lng - 360;
        return {
          type: "Feature",
          id: e.id,
          geometry: {
            type: "MultiPoint",
            coordinates: [[westLng, e.lat]],
          },
          properties: {
            prop0: "value0",
          },
        };
      });

      const geojson = {
        type: "FeatureCollection",
        features: pointFeature,
      };

      // create a new blob from geojson featurecollection
      const blob = new Blob([JSON.stringify(geojson)], {
        type: "application/json",
      });

      // URL reference to the blob
      const url = URL.createObjectURL(blob);
      console.log(pointFeature);
      // create new geojson layer using the blob urlg23
      

      const layer = new GeoJSONLayer({
        title: "Earthquakes from the last month",
        url: url,
        copyright: "USGS Earthquakes",

        // popupTemplates can still be viewed on
        // individual features
        popupTemplate: {
          title: "fish",
          content: "Magnitude {mag} {type} hit {place} on {time}",
        },
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-marker",
            size: 4,
            color: "#69dcff",
            outline: {
              color: "rgba(0, 139, 174, 0.5)",
              width: 5,
            },
          },
        },
      });

      map.add(layer); // adds the layer to the map
    }
  });

  return <div style={mapStyles} className="mapDiv" ref={mapDiv}></div>;
}
