import React, {useEffect, useRef} from 'react'
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";


export default function WebMap({placeList}) {
 
    const mapDiv = useRef(null);
console.log(placeList)
    const defaultCenter = {
      lat: placeList.length ? placeList[0].lat : 0,
      lng: placeList.length ? placeList[0].lng : 0,
    };

    function createPoint({ graphicsLayer, lng, lat }) {
      const point = {
        //Create a point
        type: "point",
        longitude: lng,
        latitude: lat,
      };
  
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
          zoom: 7
        });


      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

    

      placeList.forEach(e=>createPoint({graphicsLayer:graphicsLayer, lng: e.lng, lat: e.lat}))
     
      }
      
    }, );
  
    return <div style={{"height":"400px"}} className="mapDiv" ref={mapDiv}></div>;
}
