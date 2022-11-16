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

  useEffect(() => {
    if (mapDiv.current) {
      esriConfig.portalUrl = "https://jpstupfel.maps.arcgis.com";


      const map = new WebMap({
        portalItem: {
          // autocasts as new PortalItem()
          id: "480baf2adf9947ed9a32d2873b0421be",
        },
      });

      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [defaultCenter.lng, defaultCenter.lat],
        zoom: 7,
      });

      const pointFeature = placeList.map((e) => {
        const westLng = e.lng - 360;
        return {
          type: "Feature",
          id: e.id,
          geometry: {
            type: "MultiPoint",
            coordinates: [[westLng, e.lat]],
          },
          properties: {
            prop0: "value0",
          },
        };
      });

      const geojson = {
        type: "FeatureCollection",
        features: pointFeature,
      };

      // create a new blob from geojson featurecollection
      const blob = new Blob([JSON.stringify(geojson)], {
        type: "application/json",
      });

      // URL reference to the blob
      const url = URL.createObjectURL(blob);
      console.log(pointFeature);
      // create new geojson layer using the blob urlg23
      

      const clusterConfig = {
        type: "cluster",
        clusterRadius: "100px",
        // {cluster_count} is an aggregate field containing
        // the number of features comprised by the cluster
        popupTemplate: {
          title: "Cluster summary",
          content: "This cluster represents {cluster_count} earthquakes.",
          fieldInfos: [
            {
              fieldName: "cluster_count",
              format: {
                places: 0,
                digitSeparator: true
              }
            }
          ]
        },
        clusterMinSize: "24px",
        clusterMaxSize: "60px",
        labelingInfo: [
          {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
              expression: "Text($feature.cluster_count, '#,###')"
            },
            symbol: {
              type: "text",
              color: "#004a5d",
              font: {
                weight: "bold",
                family: "Noto Sans",
                size: "12px"
              }
            },
            labelPlacement: "center-center"
          }
        ]
      };

      const layer = new GeoJSONLayer({
        title: "Earthquakes from the last month",
        url: url,
        copyright: "USGS Earthquakes",

        featureReduction: clusterConfig,

        // popupTemplates can still be viewed on
        // individual features
        popupTemplate: {
          title: "Magnitude {mag} {type}",
          content: "Magnitude {mag} {type} hit {place} on {time}",
          fieldInfos: [
            {
              fieldName: "time",
              format: {
                dateFormat: "short-date-short-time"
              }
            }
          ]
        },
        renderer: {
          type: "simple",
          field: "mag",
          symbol: {
            type: "simple-marker",
            size: 4,
            color: "#69dcff",
            outline: {
              color: "rgba(0, 139, 174, 0.5)",
              width: 5
            }
          }
        }
      });


      map.add(layer); // adds the layer to the map
    }
  });

  return <div style={mapStyles} className="mapDiv" ref={mapDiv}></div>;
}
