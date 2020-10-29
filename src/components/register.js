import React from "react"
import { navigate } from "gatsby"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import { handleRegister } from "../services/register"

class Register extends React.Component {
  state = {
    name: ``,
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
    return await handleRegister(this.state);
  }

  render() {

    return (
      <>
        <h1>Register your account</h1>
        <Form
          method="post"
          onSubmit={async event => {
            await this.handleSubmit(event)
            navigate(`/app/login`)
          }}      
        >
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" 
              name="name" 
              onChange={this.handleUpdate} 
            />
          </Form.Group>

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

          <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" placeholder="Repeat password"
              type="password"
              name="re-password"
              onChange={this.handleUpdate}            
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </>
    )
  }
}

export default Register