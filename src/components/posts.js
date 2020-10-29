import React from "react"
import { navigate } from "gatsby"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

import { isLoggedIn, getUserToken, logout } from "../services/auth"
import Paginator from '../components/Paginator/Paginator';

class Posts extends React.Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: '',
    postPage: 1,
    postsLoading: true,
    editLoading: false
  };

  componentDidMount() {
    console.log(isLoggedIn());
    if (!isLoggedIn()) {
      navigate(`/app/login`);
    }
    this.loadPosts();
  }

  loadPosts = async direction => {
    try {
      if (direction) {
        this.setState({ postsLoading: true, posts: [] });
      }
      let page = this.state.postPage;
      if (direction === 'next') {
        page++;
        this.setState({ postPage: page });
      }
      if (direction === 'previous') {
        page--;
        this.setState({ postPage: page });
      }
      const graphqlQuery = {
        query: `      
          {
            posts(page: ${page}) {
              posts {
                _id
                title
                content
                creator {
                  name
                }
                createdAt
              }
              totalPosts
            }
          }
        `
      };
      const userToken = getUserToken();
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      });
      const resultData = await response.json();
      this.setState({
        posts: resultData.data.posts.posts.map(post => {
          return {
            ...post,
            imagePath: post.imageUrl
          };
        }),
        totalPosts: resultData.data.posts.totalPosts,
        postsLoading: false
      });
    } catch(err) {
      console.log(err.message);
      // Log out if authentication token expiry
      logout(() => navigate(`/app/login`));
    }
  };

  render() {
    return (
      <>
        <h1>Posts</h1>
          {this.state.posts.length <= 0 && !this.state.postsLoading ? (
              <p style={{ textAlign: 'center' }}>No posts found.</p>
            ) : null}
            {!this.state.postsLoading && (
              <Paginator
                onPrevious={this.loadPosts.bind(this, 'previous')}
                onNext={this.loadPosts.bind(this, 'next')}
                lastPage={Math.ceil(this.state.totalPosts / 2)}
                currentPage={this.state.postPage}
              >
                {this.state.posts.map(post => (
                  <Row>
                    <Col xs={12} md={6}>{post.title}</Col>
                    <Col xs={12} md={6}>{post.createdAt}</Col>
                  </Row>
                ))}
              </Paginator>
            )}
      </>
    )
  }

}

export default Posts