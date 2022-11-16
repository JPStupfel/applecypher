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

  function createPoint({ graphicsLayer, lng, lat, popupTitle, description, imageUrl }) {
    const point = {
      //Create a point
      type: "point",
      longitude: lng,
      latitude: lat,
    };

    const popupTemplate = {
      title: popupTitle,
      content: `<img src=${imageUrl}></img>`
   }
   
   const attributes = {
      Name: "Graphic",
      Description: description
   }

    const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40], // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1,
      },
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol,
      attributes: attributes,
    popupTemplate: popupTemplate
    });
    graphicsLayer.add(pointGraphic);
  }


  useEffect(() => {
    if (mapDiv.current) {

      esriConfig.portalUrl = "https://jpstupfel.maps.arcgis.com";

      // const map = new WebMap({ basemap: "hybrid"}
      // );
      const map = new WebMap({
        portalItem: { // autocasts as new PortalItem()
          id: "480baf2adf9947ed9a32d2873b0421be"
        }
      });

      
      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [defaultCenter.lng, defaultCenter.lat],
        zoom: 7,
      });

      // uncomment to restore graphics layer
      // const graphicsLayer = new GraphicsLayer();
      // map.add(graphicsLayer);
      // placeList.forEach((e) =>
      //   createPoint({ graphicsLayer: graphicsLayer, lng: e.lng, lat: e.lat, popupTitle:e.title, description:e.description, imageUrl: e.first_picture })
      // );
    //   var multiPoint = new Multipoint(new SpatialReference({ wkid:4326 }));
    //  placeList.forEach((e) =>{
    //   let westLat =  e.lat - 360
    //   multiPoint.addPoint([ westLat ,e.lng])
    //  });

      var pointArray = placeList.map((e) =>{
        const westLng =  e.lng - 360
        return([westLng, e.lat]) 
     });

      
     const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            id: 1,
            geometry: {
              "type": "MultiPoint",
              "coordinates": pointArray
            },
            properties: {
              prop0: "value0",
            }
          }
        ]
      };
    
      // create a new blob from geojson featurecollection
      const blob = new Blob([JSON.stringify(geojson)], {
        type: "application/json"
      });
      
      // URL reference to the blob
      const url = URL.createObjectURL(blob);
      console.log(blob)
      // create new geojson layer using the blob url
      const layer = new GeoJSONLayer({
        url
      });

      map.add(layer);  // adds the layer to the map
    }
  });

  return <div style={mapStyles} className="mapDiv" ref={mapDiv}></div>;
}
