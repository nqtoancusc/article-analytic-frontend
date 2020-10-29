import React from "react"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"

export default function NavBar() {
  let greetingMessage = ""
  if (isLoggedIn()) {
    greetingMessage = `Hello ${getUser().name}`
  } else {
    greetingMessage = ""
  }
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <span>{greetingMessage}</span>
      <nav>
        <Link to="/app/register" style={{ marginRight: `1.45rem` }}>Register</Link>
        {isLoggedIn() ? (
            <>  
                <Link to="/app/create-post" style={{ marginRight: `1.45rem` }}>Create post</Link>
                <Link to="/app/posts" style={{ marginRight: `1.45rem` }}>Posts</Link>
                <Link to="/app/profile" style={{ marginRight: `1.45rem` }}>Profile</Link>  
                <a
                    href="/"
                    onClick={event => {
                    event.preventDefault()
                    logout(() => navigate(`/app/login`))
                    }}

                    style={{ marginRight: `1.45rem` }}
                >
                    Logout
                </a>
            </>
        ) : (
            <Link to="/app/login" style={{ marginRight: `1.45rem` }}>Log in</Link>
        )}
      </nav>
    </div>
  )
}