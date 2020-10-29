import React from "react"
import { navigate } from "gatsby"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

import { isLoggedIn } from "../services/auth"

import { handleCreatePost } from "../services/create-post"


class CreatePost extends React.Component {
  state = {
    title: ``,
    content: ``,
    imageUrl: ``
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    return await handleCreatePost(this.state);
  }

  render() {
    if (!isLoggedIn()) {
      navigate(`/app/login`)
    }

    return (
      <>
        <h1>Create your new post</h1>
        <Form
          method="post"
          onSubmit={async event => {
            await this.handleSubmit(event)
            navigate(`/app/posts`)
          }}      
        >
          <Form.Group controlId="formPostTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" 
              name="title" 
              onChange={this.handleUpdate} 
            />
          </Form.Group>

          <Form.Group controlId="formPostContent">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows="3" 
              name="content" 
              onChange={this.handleUpdate} 
            />
          </Form.Group>

          <Form.Group>
            <Form.File id="formPostImageUrl" label="Image" 
              name="content" 
              onChange={this.handleUpdate} 
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create post
          </Button>
        </Form>
      </>
    )
  }
}

export default CreatePost