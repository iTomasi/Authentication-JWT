import React, {useState} from 'react';
import {Switch, Route} from "react-router-dom";

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
    theimg: string
  },

  auth: boolean
}

const App = () => {

  const [userData, setUserData] = useState<IUser>({token: {id: 0, username: "Tomas", verified: true, email: "tomas@ironwill.com", therank: "user", theimg: "https://i.pinimg.com/originals/e0/00/90/e00090ebaee8a7036a15439452006ad2.jpg"}, auth: false})

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
