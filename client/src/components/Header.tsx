import React, {useState, useEffect} from "react";
import {NavLink, useHistory, Link} from "react-router-dom";
import "./scss/header.scss";

interface IHeaderProps {
    isAuth: boolean,
    img: string,
    username: string
}

const Header = ({isAuth, img, username}: IHeaderProps) => {
    
    const history = useHistory();

    const [displayCog, setDisplayCog] = useState(false);

    useEffect(() => {
        const hiddeOptions = () => {
            if (displayCog) {
                setDisplayCog(false)
            }
        }

        window.addEventListener("click", hiddeOptions)

        return () => {
            window.removeEventListener("click", hiddeOptions)
        }
    }, [displayCog])

    const HeaderRight = () => {
        if (!isAuth) {
            return (
                <>
                <button type="button" onClick={() => history.push("/login")}>Sign In</button>
                <button type="button" onClick={() => history.push("/register")}>Sign Up</button>
                </>
            )
        }

        return (
            <>
            <div className="iw_header__right-setting">
                <i className="i__cog fas fa-cog" onClick={showOptions}></i>
                <div className="iw_header__right-setting-options" style={{display: displayCog ? "flex" : "none"}}>
                    <Link to="/">Profile</Link>
                </div>
            </div>
            <img src={"http://localhost:4000/img/" + img} alt={username} />
            <button type="button" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login"
            }}>Logout</button>
            </>
        )

    }

    const showOptions = () => {
        if (!displayCog) return setDisplayCog(true)
        return setDisplayCog(false)
    }

    return (
        <header className="iw_header">
            <div className="iw_header__left">
                <h2>JWT Login</h2>
            </div>

            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </nav>

            <div className="iw_header__right"><HeaderRight/></div>
        </header>
    )
}

export default Header