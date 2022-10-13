import React from 'react';
import MapContainer from './MapContainer'
import ProjectClientCard from './ProjectClientCard';

export default function MyProjectsPage({projectList}) {

  if (!projectList.length){return(<>No Projects Loaded!</>)}

const openProjectList = projectList.length ? projectList.filter(project=>!project.victor_id) : null
const closedProjectList = projectList.length ? projectList.filter(projects=>projects.victor_id) : null


const openProjectCards = openProjectList.map(e=><ProjectClientCard key={e.id} project={e} />)
const closedProjectCards = closedProjectList.map(e=><ProjectClientCard key={e.id} project={e} />)


  return (
				 <div id="gallery" className="gallery row gx-0">
         <MapContainer projectList={projectList}/>

          {openProjectCards}
          </div>
 
  )
}
