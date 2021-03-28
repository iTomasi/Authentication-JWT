import React, {useState} from "react";
import {useHistory, Link} from "react-router-dom";
import Notification from "../components/Notification";
import Axios from "axios";
import "./scss/form.scss";
import "./scss/register.scss";

const Register = () => {
    const history = useHistory();

    const [notification, setNotification] = useState({
        type: "error",
        msg: "asdasd xd",
        addActive: false
    })

    const [userRegistered, setUserRegistered] = useState({
        display: false,
        username: "",
        verifyToken: "",
        verifyCode: ""
    })

    let notification_TimeOut: any;

    const sendingDatas = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const email = formData.get("email");
        const confirm_email = formData.get("confirmemail");
        const password = formData.get("password");
        const confirm_password = formData.get("confirmpassword");

        if (username === "" || email === "" || confirm_email === "" || password === "" || confirm_password === "" || !username || !email || !confirm_email || !password || !confirm_password) {
            showNotification("Datas missing..", "error")
            return
        }

        else if (email !== confirm_email) {
            showNotification("Email are not same", "error")
            return
        }

        else if (password !== confirm_password) {
            showNotification("Password are not same", "error")
            return
        }

        Axios.post("http://localhost:4000/auth/register", {username, email, confirmemail: confirm_email, password, confirmpassword: confirm_password}, {
            headers: {"Content-Type": "application/json"}
        })
            .then(res => {
                if (res.data.message !== "Registered") {
                    showNotification(res.data.message, "error")
                    return
                }

                setUserRegistered((prev: any) => (
                    {...prev, display: true, username: res.data.userData.username, verifyCode: res.data.userData.vcode, verifyToken: res.data.token}
                ))
            })
    }

    const showNotification = (msg: string, type: string) => {
        if (notification.addActive) {
            setNotification((prev: any) => ({...prev, addActive: false}))
            clearTimeout(notification_TimeOut)
            console.log("?")
        }

        setNotification((prev: any) => (
            {...prev, addActive: true, msg, type}
        ))

        notification_TimeOut = setTimeout(() => {
            setNotification((prev: any) => (
                {...prev, addActive: false}
            ))
        }, 3000)
    }

    return (
        <>
        <Notification type={notification.type} msg={notification.msg} addActive={notification.addActive} />
        <form className="iw_form" onSubmit={sendingDatas}>
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

        <div className="accountRegistered" style={{display: userRegistered.display ? "flex" : "none"}}>
            <div className="divBox">
                <h3>Hey {userRegistered.username} your account was created satisfactorily</h3>
                <p className="divBox__p-warning">*for reasons that this project will not be carried out to production the verification will not be sent by email.*</p>
                <p>Please save this code: <span>{userRegistered.verifyCode}</span></p>
                <p>When you already saved the verify code please click in the following link</p>
                <Link to={"/verify-acc/" + userRegistered.verifyToken}>Click me brother</Link>


            </div>
        </div>
        </>
    )
}

export default Register;