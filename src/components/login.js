import React from "react"
import { navigate } from "gatsby"
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
  /*
  componentDidMount () {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }
  }
  */
  render() {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }

    return (
      <>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={async event => {
            await this.handleSubmit(event)
            navigate(`/app/profile`)
          }}
        >
          <label>
            Email
            <input type="text" name="email" onChange={this.handleUpdate} />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}

export default Login