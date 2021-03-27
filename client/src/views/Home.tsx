import React from "react";
import {Link} from "react-router-dom";
import "./scss/home.scss";

interface IHomeProps {
    isAuth: boolean,
    username: string
}

const Home = ({isAuth, username}: IHomeProps) => {
    if (!isAuth) {
        return (
            <div className="content">
                <h2>Hey user! Welcome to JWT Login Project. Please <Link to="/register">Click Here</Link> for create an account</h2>
            </div>
        )
    }

    return (
        <div className="content">
            <h2>Hey! {username} glad to see you</h2>
        </div>
    )
}

export default Home