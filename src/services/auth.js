export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = async ({ email, password }) => {
  try {
    const graphqlQuery = {
      query: `
        {
          login(email: "${email}", password: "${password}") {
            token
            userId
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
        throw new Error('User login failed!');
      }

      return setUser({
        name: resultData.data.login.name,
        email: resultData.data.login.email,
        token : resultData.data.login.token,
        userId: resultData.data.login.userId
      })
    }
  } catch(err) {
    console.log(err.message);
    return false;
  }
  return false;
}

export const getUserToken = () => {
  const user = getUser()
  return user.token
}

export const isLoggedIn = () => {
  const user = getUser()
  console.log(user);
  return !!user.email
}

export const logout = callback => {
  setUser({})
  callback()
}