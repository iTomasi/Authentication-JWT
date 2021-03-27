import React from 'react';
import {Switch, Route} from "react-router-dom";

// Components
import Header from "./components/Header";

// Views
import Register from "./views/Register";
import Login from "./views/Login";

const App = () => {
  return (
    <>
    <Header isAuth={false} username="Tomas" img="https://i.pinimg.com/originals/e0/00/90/e00090ebaee8a7036a15439452006ad2.jpg"/>

    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
    </>
  )
}

export default App;
