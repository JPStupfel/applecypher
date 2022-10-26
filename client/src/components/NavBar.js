import React from 'react'
import {useNavigate}  from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';

function NavBar({handleLogout}) {
  const history = useNavigate();
  const user = useSelector(state=>state)
  function handleClickLogout(event){
    handleLogout();
    history('/places')
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
          <Nav.Link href="/#/places">Browse Places</Nav.Link> 
            {user.user_type === 'Client' ? <Nav.Link href="/#/new-place">Create Place</Nav.Link> : null}
          </Nav>
        </Container>
        {user.id ?
         <div className='navbar-image-container'>
          <button onClick={handleLogout}>Logout {user.username}</button>
          <img alt='' className='profile-thumbnail' src={user.image_url}></img>
          </div>
         :
         <Nav>
        <Nav.Link href="/#/login">Login</Nav.Link>
        <Nav.Link href="/#/signup">Signup</Nav.Link>
        </Nav>
        }
      </Navbar>
    </>
  );
}

export default NavBar;
