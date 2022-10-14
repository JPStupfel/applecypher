import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';



function ProjectClientCard({project}) {
  const history = useNavigate();
  const image = project.posts.length ? project.posts[0].image_url : 'loading'

  return (
           <div className='col-lg-2 col-md-3 col-sm-4 col-6'>
						<div className="image w-100">
							<div className="image-inner">
                <img src={image} alt="" />
							</div>
							<div className="image-info">
								<h5 className="title">{project.title}</h5>
								<div className="d-flex align-items-center mb-2">
									<div className="ms-auto">
									</div>
								</div>
								<div className="desc">
                  {project.description}								
                </div>
                <br/>
                <Button className="btn-gray" variant="primary" onClick={()=>history(`/myprojects/${project.id}`)}>
                  View Project
                </Button>
							</div>
						</div>
          </div>
  );
}

export default ProjectClientCard;