import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import CustomMarker from "./CustomMarker";
import { useState } from "react";
import { useEffect } from "react";
import GoogleMapView from "./GoogleMapView";
import WebMap from "./arcmap/WebMap";


const MapContainer = ({ placeList }) => {
  const [thisHeight, setThisHeight] = useState(document.body.clientHeight);
  const [thisWidth, setThisWidth] = useState(document.body.clientWidth);

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
    {1==2 ? <GoogleMapView mapStyles={mapStyles} placeList={placeList} />
    : <div style={mapStyles} className="map-box"><WebMap mapStyles={mapStyles} placeList={placeList}/></div>
    }
    </div>
  );
};
export default MapContainer;
