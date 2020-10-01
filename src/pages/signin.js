import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Login from "../components/login"

const Signin = () => (
  <Layout>
    <SEO title="Login" />
    <Login />
  </Layout>
)

export default Signin
