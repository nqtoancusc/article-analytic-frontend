export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = async ({ email, password }) => {
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

  
  // //this.setState({ authLoading: true });
  // fetch('http://localhost:3000/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(graphqlQuery)
  // })
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(resData => {
  //     if (resData.errors && resData.errors[0].status === 422) {
  //       throw new Error(
  //         "Validation failed. Make sure the email address isn't used yet!"
  //       );
  //     }
  //     if (resData.errors) {
  //       throw new Error('User login failed!');
  //     }
  //     console.log(resData);
  //     /*
  //     this.setState({
  //       isAuth: true,
  //       token: resData.data.login.token,
  //       authLoading: false,
  //       userId: resData.data.login.userId
  //     });
  //     */
  //     window.localStorage.setItem('token', resData.data.login.token);
  //     window.localStorage.setItem('userId', resData.data.login.userId);
  //     const remainingMilliseconds = 60 * 60 * 1000;
  //     const expiryDate = new Date(
  //       new Date().getTime() + remainingMilliseconds
  //     );
  //     window.localStorage.setItem('expiryDate', expiryDate.toISOString());
  //     //this.setAutoLogout(remainingMilliseconds);

  //     return setUser({
  //       email: email,
  //       token: resData.data.login.token,
  //       userId: resData.data.login.userId
  //     })
    // })
    // .catch(err => {
    //   console.log(err);
    //   /*
    //   this.setState({
    //     isAuth: false,
    //     authLoading: false,
    //     error: err
    //   });
    //   */
    // });







  /*  
  if (username === 'john' && password === 'pass') {
    return setUser({
      username: 'john',
      name: 'Johnny',
      email: 'johnny@example.org',
    })
  }
  */
  return false
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