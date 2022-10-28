import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignupContainer from "./components/SignupContainer";
import LoginContainer from "./components/LoginContainer";
import AddPlaceContainer from "./components/AddPlaceContainer";
import MyPlacesPage from "./components/MyPlacesPage";
import ViewMyPlacePage from "./components/ViewMyPlacePage";
import { connect, useSelector, useDispatch } from "react-redux";
import "./components/scss/react.scss";

function App() {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  function setUser(newUser) {
    const action = { type: "SET_USER" };
    Object.keys(user).forEach((key) => (action[key] = newUser[key]));
    dispatch(action);
  }

  useEffect(() => {
    fetch("/me")
      .then((r) => r.json())
      .then((d) => setUser(d))
      .catch((e) => console.log(e));
  }, []);

  function handleLogout() {
    fetch("/session", { method: "DELETE" })
      .then((r) => r.json())
      .then((d) => {
        setUser({ id: null, username: null, user_type: null, image_url: null });
      })
      .catch((e) => console.log(e));
  }

  return (
    <Router>
      <div>
        <NavBar handleLogout={handleLogout} />
        {/* routes if not logged in */}
        {!user.user_type ? (
          <Routes>
            <Route
              path="/signup"
              exact
              element={<SignupContainer setUser={setUser} />}></Route>
            <Route
              path="/login"
              exact
              element={<LoginContainer setUser={setUser} />}></Route>
          </Routes>
        ) : null}
        <Routes>
          <Route path="/" exact element={<MyPlacesPage />}></Route>
          <Route path="/places" exact element={<MyPlacesPage />}></Route>
          <Route
            path="/places/:id"
            exact
            element={
              user.user_type === "Client" ? (
                <ViewMyPlacePage />
              ) : (
                <LoginContainer setUser={setUser} />
              )
            }></Route>
          <Route
            path="/new-place"
            exact
            element={
              user.user_type === "Client" ? (
                <AddPlaceContainer />
              ) : (
                <LoginContainer setUser={setUser} />
              )
            }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default connect((store) => store)(App);
