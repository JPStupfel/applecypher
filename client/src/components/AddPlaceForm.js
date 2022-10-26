import React, {useState} from 'react'


export default function AddPlaceForm({handleSubmitPlaceToAPI, placeData, setPlaceData}) {

const [posts, setPosts] = useState([])

function handleSubmit(event){
   event.preventDefault() 
   handleSubmitPlaceToAPI()
}
function handleChange(event){
    const id = event.target.id
    const input = event.target.value
    const newFormData ={...placeData}
    newFormData[id] = input
    setPlaceData(newFormData)
}
  return (
  <div className='signup-form'>
    <h1>Create a new place!
    </h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title  
        </label>
        <input onChange={handleChange} type="text" className="form-control" id="title"  placeholder="Enter Place Title"/>
      </div>
      <div className="form-group">
        <label>description
        </label>
        <textarea onChange={handleChange}  type="text" className="form-control" id="description" placeholder="description"/>
      </div>
      <div className="form-check">
      </div>
      <div className="form-check">
      </div>
      <button type="submit" className="btn btn-primary">Submit
      </button>
    </form>
  </div>
  )
}
