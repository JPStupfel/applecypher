import React, {useState} from 'react'
import Button from 'react-bootstrap/esm/Button';

function FileForm({handleAddImageToImageData, handleAddWebImageToImageData}) {

  const [url, setUrl] = useState([])
  const [webPic, setWebPic] = useState({url:''})

  function handleChange(event){
    let value = event.target.value
    let pic = {...webPic}
    pic.url = value
    setWebPic(pic)
  }
  function handleSubmit(event){
  event.preventDefault();
  const data= new FormData();
  data.append("[title]", event.target.title.value)
  data.append("post[image]", event.target.image.files[0])
  handleAddImageToImageData(data)
  let url = URL.createObjectURL(event.target.image.files[0])
  setUrl(prev=>[...prev, url])
  }

  function handleSubmitWeb(event){
  event.preventDefault();
  const data= {...webPic}
  handleAddWebImageToImageData(data)
  setUrl(prev=>[...prev, data.url])
  }

   const images = url.length ? url.map(e=>
    <div className="gallery">
      <a href={e} className="ratio ratio-4x3" data-pswp-src="../assets/img/gallery/gallery-1.jpg" data-pswp-width="1200" data-pswp-height="800">
        <img src={e}/>
      </a>
    </div>
    ) : null

  return (
      <div>
        <h1>Upload Images From Device</h1>

        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type='file' name="Image" id="image"/>
          <br/>
          <Button className="btn-gray" variant="primary" type="submit"> Attach Photo to Place!</Button>
        </form>
        
        <h1>Add Images from the Web</h1>
        <form onSubmit={handleSubmitWeb}>
          <input onChange={handleChange} type="text" className="form-control" id="webPic"  placeholder="Enter URL from the Web"/>
          <Button className="btn-gray" variant="primary" type="submit"> Attach Photo to Place!</Button>
        </form>

        <div className='gallery-v2' id="gallery">
        {images}
        </div>
      </div>
  )
}

export default FileForm