import React, { useEffect, useRef } from "react";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import esriConfig from "@arcgis/core/config";

export default function MyWebMap({ placeList, mapStyles }) {
  const mapDiv = useRef(null);
  const defaultCenter = {
    lat: placeList.length ? placeList[0].lat : 0,
    lng: placeList.length ? placeList[0].lng : 0,
  };
  // create the map
  const map = new WebMap({
    portalItem: {
      // autocasts as new PortalItem()
      id: "480baf2adf9947ed9a32d2873b0421be",
    },
  });
  if (mapDiv.current) {
    esriConfig.portalUrl = "https://jpstupfel.maps.arcgis.com";
  }
  // create the view (ie initial render of map)
  const view = new MapView({
    map,
    container: mapDiv.current,
    center: [defaultCenter.lng, defaultCenter.lat],
    zoom: 7,
  });

  // feature desc for each point to display in geojson
  const pointFeature = placeList.map((e) => {
    const westLng = e.lng - 360;
    return {
      type: "Feature",
      id: e.id,
      geometry: {
        type: "Point",
        coordinates: [westLng, e.lat],
      },
      properties: {
        prop0: "value0",
        title: e.title,
        imageUrl: e.first_picture,
      },
    };
  });
  // geojson attributes with points features as features
  const geojson = {
    type: "FeatureCollection",
    features: pointFeature,
  };
  // create a new blob from geojson featurecollection
  const blob = new Blob([JSON.stringify(geojson)], {
    type: "application/json",
  });
  // URL reference to the blob
  const url = window.URL.createObjectURL(blob);
  console.log("url=", url);
  console.log("blob=", blob);

  // create new geojson layer using the blob urlg23
  const clusterConfig = {
    type: "cluster",
    clusterRadius: "100px",
    // {cluster_count} is an aggregate field containing
    // the number of features comprised by the cluster
    popupTemplate: {
      title: "Cluster summary",
      content: "This cluster represents {cluster_count} places.",
      fieldInfos: [
        {
          fieldName: "cluster_count",
          format: {
            places: 0,
            digitSeparator: true,
          },
        },
      ],
    },
    clusterMinSize: "49px",
    clusterMaxSize: "60px",
    labelingInfo: [
      {
        deconflictionStrategy: "none",
        labelExpressionInfo: {
          expression: "Text($feature.cluster_count, '#,###')",
        },
        symbol: {
          type: "text",
          color: "#004a5d",
          font: {
            weight: "bold",
            family: "Noto Sans",
            size: "20px",
          },
        },
        labelPlacement: "center-center",
      },
    ],
  };
  const layer = new GeoJSONLayer({
    title: "Awesome Places",
    url: url,
    featureReduction: clusterConfig,
    // popupTemplates can still be viewed on
    // individual features
    popupTemplate: {
      title: "{title}",
      content: "<img src={imageUrl}><img/>",
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: 15,
        color: "#69dcff",
        outline: {
          color: "rgba(0, 139, 174, 0.5)",
          width: 5,
        },
      },
    },
  });
  // useEffect to initiate map anytime placelist changes
  useEffect(() => {map.add(layer);}, [placeList]);
  return <div style={mapStyles} className="mapDiv" ref={mapDiv}></div>;
}
