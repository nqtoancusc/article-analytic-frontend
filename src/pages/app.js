import React from "react"

import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Register from "../components/register"
import Login from "../components/login"
import CreatePost from "../components/create-post"
import Posts from "../components/posts"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <PrivateRoute path="/app/create-post" component={CreatePost} />
      <PrivateRoute path="/app/posts" component={Posts} />
      <Register path="/app/register" />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App