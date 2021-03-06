import React from "react"
import { navigate } from "gatsby"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
  state = {
    email: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    return await handleLogin(this.state);
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }

    return (
      <>
        <h1>Log in</h1>  
        <Form
          method="post"
          onSubmit={async event => {
            await this.handleSubmit(event)
            navigate(`/app/profile`)
          }}        
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" 
              name="email" 
              onChange={this.handleUpdate} 
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              type="password"
              name="password"
              onChange={this.handleUpdate}            
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form>
      </>
    )
  }
}

export default Login