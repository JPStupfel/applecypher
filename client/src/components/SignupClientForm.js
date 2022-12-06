import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// export default function SignupClientForm({ setUser }) {
export default class SignupClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.formData = {
      username: null,
      password: null,
      password_confirmation: null,
      image_url: null,
    };
    this.state.postError = [];
  }

  checkForErrors = async (response) => {
    if (!response.ok) {
      let error = await response.json();
      // setPostError(error.errors);
      const newErrorState = { ...this.state, postError: error.errors };
      this.setState(newErrorState);
      throw Error(error.errors);
    } else {
      return response.json();
    }
  };
  // handleThisSubmit = (event) => {
  //   debugger;
  //   fetch("/session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(this.state.formData),
  //   })
  //     .then(this.checkForErrors)
  //     .then((d) => {
  //       this.props.setUser(d);
  //       const newErrorState = {...this.state, postError: []}
  //       this.setState(newErrorState);
  //      this.props.history.push('/places')
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  handleThisSubmit  = (event) => {
    event.preventDefault();
    fetch("/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.formData),
    })
      .then(this.checkForErrors)
      .then((d) => {
        this.props.setUser(d);
        const newErrorState = {...this.state, postError: []}
        this.setState(newErrorState);
      //  this.props.history.push('/places')
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleChange = (event) => {
    const id = event.target.id;
    const input = event.target.value;
    const newFormData = { ...this.state };
    newFormData.formData[id] = input;
    this.setState(newFormData);
  };
  render() {
    const { navigation } = this.props;
    return (
      <div className="login-body">
        <div className="login-content fs-13px">
          <form onSubmit={this.handleThisSubmit}>
            <div className="form-floating mb-20px">
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control fs-13px h-45px"
                id="username"
                placeholder="Username"
              />
              <label
                htmlFor="username"
                className="d-flex align-items-center py-0"
              >
                Username
              </label>
            </div>
            <div className="form-floating mb-20px">
              <input
                onChange={this.handleChange}
                type="password"
                className="form-control fs-13px h-45px"
                id="password"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="d-flex align-items-center py-0"
              >
                Password
              </label>
            </div>
            <div className="form-floating mb-20px">
              <input
                onChange={this.handleChange}
                type="password"
                className="form-control fs-13px h-45px"
                id="password_confirmation"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="password_confirmation"
                className="d-flex align-items-center py-0"
              >
                Confirm Password
              </label>
            </div>
            <div className="form-floating mb-20px">
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control fs-13px h-45px"
                id="image_url"
                placeholder="Profile Picture Url"
              />
              <label
                htmlFor="password_confirmation"
                className="d-flex align-items-center py-0"
              >
                Profile Picture Url
              </label>
            </div>
            <div className="form-floating mb-20px">
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control fs-13px h-45px"
                id="email"
                placeholder="Enter username"
              />
              <label
                htmlFor="password_confirmation"
                className="d-flex align-items-center py-0"
              >
                Enter email
              </label>
            </div>
            <div className="form-check mb-20px">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <div className="login-buttons">
              <button
                type="submit"
                className="btn h-45px btn-success d-block w-100 btn-lg"
              >
                Sign me up
              </button>
              <br />
              <label className="form-check-label text-danger">
                {this.state.postError.length
                  ? this.state.postError.map((e) => <div>{e}</div>)
                  : null}
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
