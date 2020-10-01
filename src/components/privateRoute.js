import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }
  /*
  if (!isLoggedIn() && location.pathname !== `/signin`) {
    navigate("/signin")
    return null
  }
  */
  return <Component {...rest} />
}

export default PrivateRoute