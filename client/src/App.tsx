import React, {useState, useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import {isAuthenticated} from "./isAuthenticated";

// Components
import Header from "./components/Header";

// Views
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home";
import VerifyAcc from "./views/VerifyAcc";
import Profile from "./views/Profile";
import EditProfile from "./views/EditProfile";

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
      <Route exact path="/verify-acc/:token" component={VerifyAcc}/>
      <Route exact path="/profile" component={() => <Profile img={userData.token.theimg} username={userData.token.username} rank={userData.token.therank} email={userData.token.email} />}/>
      <Route exact path="/edit-profile" component={() => <EditProfile username={userData.token.username} email={userData.token.email} img={userData.token.theimg}/>}/>
    </Switch>
    </>
  )
}

export default App;
