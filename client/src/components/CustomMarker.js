import React, {useState} from 'react'
import { InfoBox, Marker } from '@react-google-maps/api';


export default function CustomMarker({place}) {

        const [showInfo, setShowInfo] = useState(false)

        const location = {lat:place.lat, lng: place.lng}

      const image = place.pictures.length ? place.pictures[0].url : ''


        const info =    
        <InfoBox
        position={location}
        options={{  closeBoxURL: ``, enableEventPropagation: true }}
        onCloseClick={()=>console.log('close')}
        >
            <div style={{ backgroundColor: `white`,' maxWidth':'100px' }}>
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                {place.title}
              </div>
              <img src={image} alt='' className='map-image' />
              
            </div>
        </InfoBox>
  return (
    <Marker un onClick={()=>setShowInfo(p=>!p)} optimized={false} key={place.title} position={location}>
  
   {showInfo ? info : null}

   </Marker>
  )
}
