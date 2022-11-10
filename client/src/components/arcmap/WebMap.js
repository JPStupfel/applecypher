import React, { useEffect, useRef } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

export default function WebMap({ placeList, mapStyles }) {
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
      content: `<img src=${imageUrl}>${imageUrl}</img>`
   }
   
   const attributes = {
      Name: "Graphic",
      Description: "I am a polygon"
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
      const map = new ArcGISMap({
        basemap: "gray-vector",
      });

      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [defaultCenter.lng, defaultCenter.lat],
        zoom: 7,
      });

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      console.log(placeList[0])

      placeList.forEach((e) =>
        createPoint({ graphicsLayer: graphicsLayer, lng: e.lng, lat: e.lat, popupTitle:e.title, description:e.description, imageUrl: e.first_picture })
      );
    }
  });

  return <div style={mapStyles} className="mapDiv" ref={mapDiv}></div>;
}
