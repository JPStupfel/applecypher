import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function PlaceClientCard({ place }) {
  const history = useNavigate();
  const image = place.first_picture ? place.first_picture : "loading";

  return (
    <li className="grid-cell" datatype="region">
      <div className="grid-card">
        <div className="col-12">
          <div className="image w-100">
            <div className="image-inner">
              <img src={image} alt="" />
            </div>
            <div className="image-info">
              <h5 className="title">{place.title}</h5>
              <div className="d-flex align-items-center mb-2">
                <div className="ms-auto"></div>
              </div>
              <div className="desc">{place.description}</div>
              <br />
              <Button
                className="btn-gray"
                variant="primary"
                onClick={() => history(`/places/${place.id}`)}
              >
                View Place
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PlaceClientCard;
