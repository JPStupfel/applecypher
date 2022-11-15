import React from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import CustomMarker from "./CustomMarker";
import { useState } from "react";
import { useEffect } from "react";

export default function GoogleMapView({placeList, mapStyles}) {
    const API_KEY = process.env.REACT_APP_API_KEY_GOOGLE_EARTH_JS;
    const defaultCenter = {
        lat: placeList.length ? placeList[0].lat : 0,
        lng: placeList.length ? placeList[0].lng : 0,
      };
      const markers = placeList.map((place) => (
        <CustomMarker key={place.id} place={place} />
      ));
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <div className="map-box">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={9}
          center={defaultCenter}
        >
          {markers}
        </GoogleMap>
      </div>
    </LoadScript> 
  )
}
