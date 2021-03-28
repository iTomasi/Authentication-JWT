import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import Notification from "../components/Notification";
import Axios from "axios";
import "./scss/form.scss";

const VerifyAcc = () => {
    const {token}: any = useParams();
    const history = useHistory();

    const [notification, setNotification] = useState({
        addActive: false,
        type: "",
        msg: ""
    })

    let notification_Timeout: any;

    useEffect(() => {
        Axios.get("http://localhost:4000/auth/", {
            headers: {"x-access-token": token}
        })
            .then(res => {
                if (res.data.verified === 1 || !res.data.auth) return window.location.href = "/";
            })
    }, [])

    const sendingCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        Axios.post("http://localhost:4000/auth/verify-acc/", {code: formData.get("code")}, {
            headers: {
                "Content-Type" : "application/json",
                "x-access-token" : token
            }
        })
            .then(res => {
                if (res.data.ready !== 1) return showNotification(res.data.message, "error");

                showNotification(res.data.message, "success");

                setTimeout(() => {
                    history.push("/login")
                }, 3000)
            })
    }

    const showNotification = (msg: string, type: string) => {
        if (notification.addActive) {
            setNotification((prev: any) => (
                {...prev, addActive: false}
            ))
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
        <Notification addActive={notification.addActive} msg={notification.msg} type={notification.type}/>
        <form className="iw_form" onSubmit={sendingCode}>
            <div className="formSection">
                <label>Verification Code</label>
                <input type="text" placeholder="Code..." name="code"/>
            </div>

            <button type="submit">Verify</button>
        </form>
        </>
    )
}

export default VerifyAcc;