import React, { useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
function VewMyPlaceImageCard({ image }) {
  return (
    <li className="grid-cell" datatype="region">
      <div className="grid-card">
        <div className="col-12">
          <div className="image w-100">
            <div className="image-inner">
              <img src={image} style={{ objectFit: "cover" }} />
            </div>
            <div className="image-info">
              <div className="d-flex align-items-center mb-2">
                <div className="ms-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default VewMyPlaceImageCard;
