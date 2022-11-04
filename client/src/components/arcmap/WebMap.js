import React, {useEffect, useRef} from 'react'
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export default function WebMap() {
 
    const mapDiv = useRef(null);

    useEffect(() => {
      if (mapDiv.current) {
        const map = new ArcGISMap({
          basemap: "gray-vector",
        });
  
        const view = new MapView({
          map,
          container: mapDiv.current,
          extent: {
            spatialReference: {
              wkid: 102100,
            },
            xmax: -13581772,
            xmin: -13584170,
            ymax: 4436367,
            ymin: 4435053,
          },
        });
      }
    }, []);
  
    return <div style={{"height":"400px"}} className="mapDiv" ref={mapDiv}></div>;
}
