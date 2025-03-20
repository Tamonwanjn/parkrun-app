import React, { useRef, useEffect } from "react";
import { Container } from "@material-ui/core";
import { Route, withRouter, useLocation } from "react-router-dom";
import "./signin-signup.css";
import Signin from "./Login.js";
import Signup from "./Register.js";
// import SignupCode from "./RegisterCode.js";

const Actions = () => {
  // const add=()=>{
  //     const container = document.querySelector("#main")
  //     container.classList.add("sign-up-mode")
  // }
  // const remove=()=>{
  //     const container = document.querySelector("main")
  //     container.classList.remove("sign-up-mode")
  // }
  const con = useRef("");
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const { current } = con;
    if (pathname === "/actions/login") {
      current.classList.remove("sign-up-mode");
    } else {
      current.classList.add("sign-up-mode");
    }
  });

  return (
    <Container maxWidth="lg" ref={con} className="container">
      <Route
        exact
        path="/actions/login"
        render={(props) => {
          return <Signin {...props} />;
        }}
      />
      <Route
        exact
        path="/actions/register"
        render={(props) => {
          return <Signup {...props} />;
        }}
      />
      {/* <Route 
            exact
                path='/actions/registercode'
                render ={props => {
                    return <SignupCode {...props} />
                }}
            /> */}
    </Container>
  );
};
export default withRouter(Actions);
