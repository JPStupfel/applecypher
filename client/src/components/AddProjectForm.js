import React, {useState} from 'react'

export default function AddProjectForm({handleSubmitProjectToAPI, projectData, setProjectData}) {
    const [formData, setFormData] = useState({title: null, description: null})

function handleSubmit(event){
   event.preventDefault() 
   handleSubmitProjectToAPI()
}

function handleChange(event){
    
    const id = event.target.id
    const input = event.target.value
    const newFormData ={...projectData}
    newFormData[id] = input
    setProjectData(newFormData)

}

// t.string "title"
// t.string "description"
// t.integer "client_id"
// t.integer "victor_id"
// t.datetime "created_at", precision: 6, null: false
// t.datetime "updated_at", precision: 6, null: false
// t.float "lat"
// t.float "lng"

  return (

    <div className='signup-form'>
    <h1>Create a new project!</h1>

    <form onSubmit={handleSubmit}>

    <div className="form-group">
      <label>Title</label>
      <input onChange={handleChange} type="text" className="form-control" id="title"  placeholder="Enter Project Title"/>

    </div>
    <div className="form-group">
      <label>description</label>
      <input onChange={handleChange}  type="text" className="form-control" id="description" placeholder="description"/>
    </div>

 
    <div className="form-check">

</div>

 




    <div className="form-check">

    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  )
}
