import Card from 'react-bootstrap/Card';

function VewMyPlaceImageCard({image}) {
  return (
    // <li class="grid-cell" datatype="region">
    //         <a href={image} >
    //           <img src={image} style={{"objectFit":"cover","width": "20vw", "height": "20vw", "padding": "10px"}}/>
    //         </a>
    //       </li>
          // <li class="grid-cell" datatype="region">
          //   <div class="grid-card">
          //     <div class="col-12">
          //       <div class="image w-100">
          //         <div class="image-inner">
          //         <img src={image} style={{"objectFit":"cover","width": "20vw", "height": "20vw", "padding": "10px"}}/>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </li>     

          <li className='grid-cell' datatype='region'>
          <div className='grid-card'>
           <div className='col-12'>
						<div className="image w-100">
							<div className="image-inner">
                <img  src={image} alt="" />
							</div>
							  <div className="image-info">
								  <div className="d-flex align-items-center mb-2">
									  <div className="ms-auto">
									  </div>
								  </div>


							  </div>
						  </div>
            </div>
          </div>
        </li>
          
          

  );
}

export default VewMyPlaceImageCard;