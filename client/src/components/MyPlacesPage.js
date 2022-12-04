import MapContainer from "./MapContainer";
import PlaceClientCard from "./PlaceClientCard";
import React, { useState, useEffect, useRef, createContext } from "react";

const MapContext = createContext(null);

export default function MyPlacesPage() {
  // for fetching places
  const [offset, setOffset] = useState(0);
  const [placeList, setPlaceList] = useState([]);
  const [search, setSearch] = useState("");
  const [extents, setExtents] = useState([]);
  const searchedPlaces = search
    ? placeList.filter((e) => e.title.includes(search))
    : placeList;
  const extentPlaces = extents.maxLat
    ? searchedPlaces.filter(
        (e) =>
          e.lat < extents.maxLat &&
          e.lat > extents.minLat &&
          getWestLng(e.lng) < extents.maxLng &&
          getWestLng(e.lng) > extents.minLng
      )
    : searchedPlaces;
  const placesToShow = extentPlaces.slice(offset, offset + 6);
  function getWestLng(lng) {
    const westLng = lng < 0 ? lng : lng - 360;
    return westLng
  }
  useEffect(() => {
    fetchPlaces();
  }, []);
  function fetchPlaces() {
    fetch(`places?limit=${100}&search=${search}`)
      .then((r) => r.json())
      .then((d) => {
        setPlaceList(d);
      })
      .catch((e) => console.log(e));
  }
  // function to change offset +/- int
  function handleChangeOffset(int) {
    if (offset + int >= 0 && offset + int <= searchedPlaces.length) {
      setOffset((prev) => setOffset(prev + int));
    }
  }
  // for resizing map and scroll bar
  const [thisHeight, setThisHeight] = useState(document.body.clientHeight);
  useEffect(() => {
    setThisHeight(document.body.clientHeight);
    window.addEventListener("resize", () =>
      setThisHeight(document.body.clientHeight)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setThisHeight(document.body.clientHeight)
      );
  });
  const scrollStyle = { height: `${thisHeight}px` };
  // for Search bar
  function handleChange(event) {
    event.preventDefault();
    setOffset(0);
    setSearch(event.target.value);
  }
  // create place cards
  const PlaceCards = placesToShow.map((e) => (
    <PlaceClientCard key={e.id} place={e} />
  ));
  console.log(extents, placeList[0]);
  return (
    <div id="gallery" className="gallery row gx-0">
      <table>
        <tbody>
          <tr>
            <td id="page_map_container" style={{ width: "60%", height: "90%" }}>
              <MapContainer setExtents={setExtents} placeList={placeList} />
            </td>
            <td id="tdSide" width="40%">
              <table>
                <tbody>
                  <tr>
                    <td className="column">
                      <div
                        id="results_scroll"
                        className="padding5"
                        style={scrollStyle}
                      >
                        <div
                          id="roadtripRegionsContainer"
                          className="margin-bottom- none"
                          style={{ display: "block;" }}
                        >
                          <form
                            className="formCustom "
                            name="regionSearch"
                            onSubmit={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <div></div>
                            <span
                              role="status"
                              aria-live="polite"
                              className="ui-helper-hidden-accessible"
                            ></span>
                            <input
                              onInput={handleChange}
                              value={search}
                              placeholder="Search Places..."
                              type="text"
                              name="region-gt2-textbasic"
                              id="ac_regionname"
                              style={{ width: "90%" }}
                              className="ui-autocomplete-input"
                              autoComplete="off"
                            />
                          </form>
                          <ul
                            id="roadtripRegions"
                            className=" grid-row grid-row--gutter grid-row--col-2 grid-row--card-min-200"
                          >
                            {placeList.length
                              ? PlaceCards
                              : "No Places Match That Description"}
                          </ul>
                          <div className="btn-group">
                            <button
                              className="btn btn-outline-inverse "
                              onClick={() => handleChangeOffset(-6)}
                            >
                              Previous
                            </button>
                            <button className="btn btn-outline-inverse">
                              Showing items {offset + 1}...
                              {offset + placesToShow.length} of{" "}
                              {placeList.length}
                            </button>
                            <button
                              className="btn btn-outline-inverse"
                              onClick={() => handleChangeOffset(6)}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
