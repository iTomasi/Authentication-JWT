import React, {useState} from "react";
import Axios from "axios";
import "./scss/form.scss";

interface IEditProfileProps {
    username: string,
    img: string,
    email: string
}

const EditProfile = ({username, img, email}: IEditProfileProps) => {

    const [imgName, setImgName] = useState<string>(img);
    const [userData, setUserData] = useState({username, email});

    const handleInput = (e: any) => {
        setUserData((prev: any) => (
            {
                ...prev,
                [e.target.name] : [e.target.value]
            }
        ))
    }

    const getFileName = (e: any) => {
        const fileName = e.currentTarget.files[0].name;

        if (fileName.length > 13) {
            setImgName(fileName.substring(0, 13) + "...")
            return
        }

        setImgName(fileName)
    }

    const updatingProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const tokenStorage: any = localStorage.getItem("token");

        Axios.put("http://localhost:4000/auth/update-account", formData, {
            headers: {"x-access-token": tokenStorage}
        })
            .then(res => {
                if (res.data.message !== "Account Updated") return console.log(res);

                localStorage.setItem("token", res.data.newToken);
                
                setTimeout(() => {
                    window.location.href = "/"
                }, 3000)
            })
    }

    return (
        <form className="iw_form" onSubmit={updatingProfile}>

            <div className="formSection">
                <label>Current Password</label>
                <input type="password" placeholder="Current Password..." name="currentpassword"/>
            </div>

            <div className="formSection">
                <label>Username</label>
                <input type="text" placeholder="Username..." name="username" value={userData.username} onChange={handleInput}/>
            </div>

            <div className="formSection">
                <label>Email</label>
                <input type="text" placeholder="New Email..." name="email" value={userData.email} onChange={handleInput}/>
            </div>

            <div className="formSection">
                <label>New Password</label>
                <input type="password" placeholder="Password..." name="newpassword"/>
            </div>

            <div className="formSection">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm New Password..." name="confirmnewpassword"/>
            </div>

            <div className="formSection form__img">
                <label htmlFor="inputFile">IMG</label>
                <span>{imgName}</span>
                <input id="inputFile" type="file" name="imgInput" style={{display: "none"}} onChange={getFileName}/>
            </div>

            <button type="submit">Edit Profile</button>
        </form>
    )
}

export default EditProfile;