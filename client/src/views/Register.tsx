import React from "react";
import "./scss/form.scss";

const Register = () => {

    return (
        <form className="iw_form">
            <div className="formSection">
                <label>Username</label>
                <input type="text" placeholder="Username..." name="username"/>
            </div>

            <div className="formSection">
                <label>Email</label>
                <input type="text" placeholder="Email..." name="email"/>
            </div>

            <div className="formSection">
                <label>Confirm Email</label>
                <input type="text" placeholder="Confirm Email..." name="confirmemail"/>
            </div>

            <div className="formSection">
                <label>Password</label>
                <input type="password" placeholder="Password..." name="password"/>
            </div>

            <div className="formSection">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password..." name="confirmpassword"/>
            </div>

            <button type="submit">Register</button>
        </form>
    )
}

export default Register;