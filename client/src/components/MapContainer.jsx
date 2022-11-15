import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GoogleMapView from "./GoogleMapView";
import MyWebMap from "./arcmap/MyWebMap";

const MapContainer = ({ placeList }) => {
  const [thisHeight, setThisHeight] = useState(document.body.clientHeight);
  const [thisWidth, setThisWidth] = useState(document.body.clientWidth);
  const [isGoogleMap, setIsGoogleMap] = useState(false)

  useEffect(() => {
    setThisHeight(document.body.clientHeight);
    window.addEventListener("resize", () =>
      setThisHeight(document.body.clientHeight)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setThisHeight(document.body.clientHeight)
      );
  }, []);

  useEffect(() => {
    setThisWidth(document.body.clientWidth);
    window.addEventListener("resize", () =>
      setThisWidth(document.body.clientWidth)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setThisWidth(document.body.clientWidth)
      );
  }, []);

  const mapStyles =
    thisWidth > 415
      ? { height: thisHeight, width: "100%" }
      : { height: 300, width: "100%" };

  return (
    <div>
      {isGoogleMap ? (
        <GoogleMapView mapStyles={mapStyles} placeList={placeList} />
      ) : (
        <div style={mapStyles} className="map-box">
          <MyWebMap mapStyles={mapStyles} placeList={placeList} />
        </div>
      )}
            <button onClick={()=>setIsGoogleMap(prev=>!prev)}>{isGoogleMap ? 'View on ArcGIS Online' : "View on Google Maps"}</button>

    </div>
  );
};
export default MapContainer;
