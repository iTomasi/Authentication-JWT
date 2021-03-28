import React, {useState} from "react";
import Notification from "../components/Notification";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import "./scss/form.scss";

const Login = () => {
    const history = useHistory();

    const [notification, setNotification] = useState({
        type: "",
        msg: "",
        addActive: false
    })

    let notification_Timeout: any;

    const loggin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        if (username === "" || password === "" || !username || !password) {
            showNotification("Datas missing", "error")
            return
        }

        Axios.post("http://localhost:4000/auth/login", {username, password}, {
            headers: {"Content-Type": "application/json"}
        })
            .then(res => {
                if (res.data.message !== "Logged") return showNotification(res.data.message, "error");

                showNotification(res.data.message, "success");
                localStorage.setItem("token", res.data.token);
                setTimeout(() => {
                    history.push("/")
                }, 3000)
            })
    }

    const showNotification = (msg: string, type: string) => {
        if (notification.addActive) {
            setNotification((prev: any) => ({...prev, addActive: false}))
            clearTimeout(notification_Timeout)
        }

        setNotification((prev: any) => (
            {...prev, addActive: true, msg, type}
        ))

        notification_Timeout = setTimeout(() => {
            setNotification((prev: any) => (
                {...prev, addActive: false}
            ))
        }, 3000)
    }

    return (
        <>
        <Notification addActive={notification.addActive} msg={notification.msg} type={notification.type} />
        <form className="iw_form" onSubmit={loggin}>
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
        </>
    )
}

export default Login;