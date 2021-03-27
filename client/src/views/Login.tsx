import React from "react";
import "./scss/form.scss";

const Login = () => {
    return (
        <form className="iw_form">
            <div className="formSection">
                <label>Username or Email</label>
                <input type="text" placeholder="Username or Email..." name="username"/>
            </div>

            <div className="formSection">
                <label>Password</label>
                <input type="password" placeholder="Password..." name="password"/>
            </div>

            <button type="submit">Log In</button>
        </form>
    )
}

export default Login;