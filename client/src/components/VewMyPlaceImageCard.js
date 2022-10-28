import Card from 'react-bootstrap/Card';

function VewMyPlaceImageCard({image}) {
  return (
          <div className="gallery">
            <a href={image} >
            <img src={image} style={{"width": "20vw",
    "height": "20vw",
    "object-fit": "cover",
    "padding": "10px"}}/>
            </a>

          </div>
  );
}

export default VewMyPlaceImageCard;