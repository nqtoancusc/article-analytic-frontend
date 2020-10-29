import { getUserToken } from "../services/auth"

export const handleCreatePost = async ({ title, content, imageUrl }) => {
  try {
    const graphqlQuery = {
      query: `
        mutation {
          createPost(postInput: { title: "${title}", content: "${content}", imageUrl: "some url" }) {
            _id
            title
            content
            imageUrl
            creator {
              name
            }
            createdAt
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
      body: JSON.stringify(graphqlQuery),
    });

    if (response) {
      let resultData = await response.json();
      
      if (resultData.errors && resultData.errors[0].status === 422) {
        throw new Error(
          "Validation failed."
        );
      }
      if (resultData.errors) {
        console.log(resultData.errors);
        throw new Error('Create post failed!');
      }

      return {
        _id: resultData.data.createPost._id,
        name: resultData.data.createPost.title,
        title: resultData.data.createPost.title,
        content: resultData.data.createPost.content,
        imageUrl: resultData.data.createPost.imageUrl
      }
    }
  } catch(err) {
    console.log(err.message);
    return false;
  }
  return false;
}