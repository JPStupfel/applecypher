import React, {useEffect, useRef} from 'react'
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export default function () {
    const mapRef = useRef();
    useEffect(()=>{
        const map = new ArcGISMap({basemap:'topo-vector'})
        const view = new MapView({
            constainer: mapRef.current,
            map:map,
            center: [-105, 35],
            zoom: 8
        })
    })
return(
<div ref={mapRef} />  
)
}
