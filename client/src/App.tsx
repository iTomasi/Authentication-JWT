import React, {useState, useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import {isAuthenticated} from "./isAuthenticated";

// Components
import Header from "./components/Header";

// Views
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home";

interface IUser {
  token: {
    id: number,
    username: string,
    verified: boolean,
    email: string,
    therank: string,
    theimg: string,
    iat: number,
    exp: number
  },

  auth: boolean
}

const App = () => {

  const [userData, setUserData] = useState<IUser>({token: {id: 0, username: "", verified: true, email: "", therank: "", theimg: "", iat: 0, exp: 0}, auth: true})

  useEffect(() => {
    isAuthenticated()
      .then(res => {
        setUserData(res.data)
      })
  }, [])

  return (
    <>
    <Header isAuth={userData.auth} username={userData.token.username} img={userData.token.theimg}/>

    <Switch>
      <Route exact path="/" component={() => <Home isAuth={userData.auth} username={userData.token.username}/>}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
    </>
  )
}

export default App;
