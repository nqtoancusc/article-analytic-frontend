/*
export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
*/
export const handleRegister = async ({ name, email, password }) => {
  const graphqlQuery = {
    query: `
      mutation {
        createUser(userInput: { email: "${email}", name: "${name}", password: "${password}" }) {
          _id
          name
          email
        }
      }
    `
  };

  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphqlQuery)
  });

  if (response) {
    let resultData = await response.json();
    
    if (resultData.errors && resultData.errors[0].status === 422) {
      throw new Error(
        "Validation failed. Make sure the email address isn't used yet!"
      );
    }
    if (resultData.errors) {
      console.log(resultData.errors);
      throw new Error('Create user failed!');
    }

    return {
      _id: resultData.data.createUser._id,
      name: resultData.data.createUser.name,
      email: resultData.data.createUser.email
    }
  }
  return false;
}