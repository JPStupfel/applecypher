import React, { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import MapContainer from './MapContainer'
import VewMyPlaceImageCard from './VewMyPlaceImageCard';

export default function ViewMyPlacePage() {
     let  {id} = useParams();
     const id_num = parseInt(id,10)
     
     const [isEditDesc, setIsEditDesc] = useState(false)
     const [currentPlace, setCurrentPlace] = useState(null)
     const history = useNavigate();
     const [description, setDescription] = useState('')

     useEffect(()=>{
        fetch(`/places/${id_num}`).then(r=>r.json()).then(d=>setCurrentPlace(d))
     },[])
     
     function deletePlace(event){
        fetch(`/places/${id_num}`, {method: "DELETE"}).catch(e=>console.log(e))
        history('/places')
     }

    function handleChange(event){
      setDescription(event.target.value)
    }

    function handleSubmit(event){
      event.preventDefault();
      // console.log(description)
      setIsEditDesc(prev=>!prev)

      // handle the patch
      fetch(`/places/${id_num}`, {method: "PATCH", headers:{'Content-Type':'application/json'}, body: JSON.stringify({'description': description })}).then(r=>r.json()).then(d=>{const newCurrentPlace = {...currentPlace}; newCurrentPlace.description = d.description; setCurrentPlace(newCurrentPlace)})

      // reset state
    }
      
     // catch ref error while fetching.
     while (!currentPlace){return(<>Loading!</>)}

     const placeImages =  currentPlace.pictures.map(e=><VewMyPlaceImageCard key={e.id} image={e.url} />) 

     

     const descriptionEditor = <form onSubmit={handleSubmit}><input onChange={handleChange} value={description}></input></form>



  return (
    <div>
      <div>
				<div className="d-sm-flex align-items-center mb-3">
				</div>
{/* FIRST ROW */}
				<div className="row">
					<div className="col-12">
						<div className="row">
{/* FIRST COMPONENT FIRST ROW */}
							<div className="col-sm-6">
								<div className="card border-0 text-truncate mb-3 bg-gray-800 text-white">
									<div className="card-body" >
										<MapContainer placeList={[currentPlace]}/>
									</div> 
								</div>
							</div>
{/* FIRST COMPONENT FIRST ROW */}
{/* SECOND COMPONENT FIRST ROW */}
							<div className="col-md-6 col-sm-6 col-sm-pull-6">
								<div className="card border-0 mb-3 bg-gray-800 text-white">
									<div className="card-body">
									</div>
								</div>
							</div>
							
						</div>
	{/* SECOND COMPONENT FIRST ROW */}
					</div>
				</div>
{/* END FIRST ROW */}
				<div className="row">
					<div className="col-12">
						<div className="card border-0 mb-3 bg-gray-900 text-white">
							<div className="card-body" style={{ background: 'no-repeat bottom right', backgroundImage: 'url(/assets/img/svg/img-4.svg)', backgroundSize: 'auto 60%'}}>
								<div className="mb-3 text-gray-500 ">
									<b>Place Images</b>
								</div>
							</div>
							<div className="widget-list rounded-bottom dark-mode">
							<div className='gallery-v2' id="gallery">
								{placeImages}
							</div>																									
							</div>
						</div>
					</div>					
				</div>
			</div>
      			<button className="ms-auto btn btn-gray btn-primary btn-sm" onClick={deletePlace}>Delete This Place
                </button>
   </div>
  )
}
