import React, {useEffect, useRef} from 'react'
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export default function WebMap({placeList}) {
 
    const mapDiv = useRef(null);
    console.log(placeList)
    const defaultCenter = {
      lat: placeList.length ? placeList[0].lat : 0,
      lng: placeList.length ? placeList[0].lng : 0,
    };
    useEffect(() => {
      if (mapDiv.current) {
        const map = new ArcGISMap({
          basemap: "gray-vector",
        });
  
        const view = new MapView({
          map,
          container: mapDiv.current,
          center: [defaultCenter.lng, defaultCenter.lat],
          zoom: 10
        
        });
      }
    }, []);
  
    return <div style={{"height":"400px"}} className="mapDiv" ref={mapDiv}></div>;
}
