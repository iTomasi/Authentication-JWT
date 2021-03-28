import React from "react";
import "./scss/profile.scss";

interface IUsernameProps {
    username: string,
    img: string,
    email: string,
    rank: string
}

const Profile = ({username, img, email, rank}: IUsernameProps) => {
    return (
        <div className="profile">
            <img src={"http://localhost:4000/img/" + img} alt={username} />
            <h3>{username}</h3>
            <h3>{email}</h3>
            <h3 className="profile__rank">Rank: {rank}</h3>
        </div>
    )
}

export default Profile;