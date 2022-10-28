import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapContainer from "./MapContainer";
import VewMyPlaceImageCard from "./VewMyPlaceImageCard";

export default function ViewMyPlacePage() {
  let { id } = useParams();
  const id_num = parseInt(id, 10);
  const [isEditDesc, setIsEditDesc] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const history = useNavigate();
  const [description, setDescription] = useState("");
  useEffect(() => {
    fetch(`/places/${id_num}`)
      .then((r) => r.json())
      .then((d) => setCurrentPlace(d));
  }, []);
  function deletePlace(event) {
    fetch(`/places/${id_num}`, { method: "DELETE" }).catch((e) =>
      console.log(e)
    );
    history("/places");
  }
  function handleChange(event) {
    setDescription(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setIsEditDesc((prev) => !prev);
    // handle the patch
    fetch(`/places/${id_num}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: description }),
    })
      .then((r) => r.json())
      .then((d) => {
        const newCurrentPlace = { ...currentPlace };
        newCurrentPlace.description = d.description;
        setCurrentPlace(newCurrentPlace);
      });
  }
  //set height for scroll
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
  const scrollStyle = { height: `${thisHeight * 0.8}px` };
  //   const scrollStyle={height: `20px`}
  // catch ref error while fetching.
  while (!currentPlace) {
    return <>Loading!</>;
  }
  const placeImages = currentPlace.pictures.map((e) => (
    <VewMyPlaceImageCard key={e.id} image={e.url} />
  ));

  return (
    <div>
      <div>
        <div className="d-sm-flex align-items-center mb-3"></div>
        {/* FIRST ROW */}
        <div className="row">
          <div className="col-12">
            <div className="row">
              {/* FIRST COMPONENT FIRST ROW */}
              <div className="col-sm-6">
                <div className="card border-0 text-truncate mb-3 bg-gray-800 text-white">
                  <div className="card-body">
                    <MapContainer placeList={[currentPlace]} />
                  </div>
                </div>
              </div>
              {/* FIRST COMPONENT FIRST ROW */}
              {/* SECOND COMPONENT FIRST ROW */}
              <div className="col-sm-6">
                <div className="card border-0 mb-3 bg-gray-800 text-white">
                  <div className="card-body">
                    <h1>{currentPlace.title}</h1>
                    <div>{currentPlace.description}</div>
                    <br />
                  </div>
                </div>
                <div id="gallery" className="gallery row gx-0">
                  <table>
                    <tbody>
                      <tr>
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
                                      <ul
                                        id="roadtripRegions"
                                        className=" grid-row grid-row--gutter grid-row--col-2 grid-row--card-min-200"
                                      >
                                        {placeImages}
                                      </ul>
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
              </div>
            </div>
            {/* SECOND COMPONENT FIRST ROW */}
          </div>
        </div>
        {/* END FIRST ROW */}
      </div>
      <button
        className="ms-auto btn btn-gray btn-primary btn-sm"
        onClick={deletePlace}
      >
        Delete This Place
      </button>
    </div>
  );
}
