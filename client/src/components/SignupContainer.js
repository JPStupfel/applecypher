import React, {useState} from 'react'
import SignupClientForm from './SignupClientForm'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import SignupProForm from './SignupProForm';


export default function SignupContainer({setUser}) {
   
  return (
      <div className="login login-v1">
				<div className="login-container">
					<div className="login-header">
            <div className="brand">
							<div className="d-flex align-items-center">
								READY<b>Set</b>BID 
							</div>
							<small>Log in or Sign up to Access Features</small>
						</div>
						<div className="icon">
							<i className="fa fa-lock"></i>
					  </div>
				  </div>
          <div className='signupContainer'>
           <SignupClientForm setUser={setUser} />
          </div>
        </div> 
		  </div>
  )
}
