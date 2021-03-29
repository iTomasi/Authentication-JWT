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

    const [displayCog, setDisplayCog] = useState<boolean>(false);
    const [showNavResponsive, setShowNavResponsive] = useState<boolean>(false);
    const [showLogoutIcon, setShowLogoutIcon] = useState<boolean>(false);

    useEffect(() => {

        window.addEventListener("resize", whenResponsive);
        window.addEventListener("resize", whenResponsive_logoutIcon);

        const hiddeOptions = () => {
            if (displayCog) {
                setDisplayCog(false)
            }
        }

        const hiddeNavResponsive = () => {
            if (showNavResponsive) {
                setShowNavResponsive(false)
            }
        }

        window.addEventListener("click", hiddeOptions);
        window.addEventListener("click", hiddeNavResponsive)

        return () => {
            window.removeEventListener("click", hiddeOptions)
            window.removeEventListener("click", hiddeNavResponsive)
        }
    }, [displayCog, showNavResponsive])

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

            <div className="iw_header__right-picture">
                <img src={"http://localhost:4000/img/" + img} alt={username} onClick={showOptions}/>

                <div className="iw_header__right-picture-options" style={{display: displayCog ? "flex" : "none"}}>
                    <Link to="/profile">Profile</Link>
                    <Link to="/edit-profile">Edit Profile</Link>
                </div>

            </div>

            <button type="button" id="logoutBtn" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}>Logout</button>
            </>
        )

    }

    const showOptions = () => {
        if (!displayCog) return setDisplayCog(true)
        return setDisplayCog(false)
    }

    const showNav = () => {
        if (window.innerWidth <= 890) {

            if (!showNavResponsive) {
                setShowNavResponsive(true)
                return
            }

            return setShowNavResponsive(false)

        }
    }

    const whenResponsive = () => {
        if (window.innerWidth >= 890) {
            setShowNavResponsive(true)
            return
        }

        else {
            setShowNavResponsive(false)
            return
        }
    }

    const whenResponsive_logoutIcon = () => {
        if (window.innerWidth <= 500) {
            setShowLogoutIcon(true);
            return
        }

        else {
            setShowLogoutIcon(false);
            return
        }
    }

    return (
        <header className="iw_header">
            <div className="iw_header__left">
                <h2>JWT Login</h2>
            </div>

            <nav style={{display: window.innerWidth <= 890 && !showNavResponsive ? "none" : "block"}}>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </nav>

            <div className="iw_header__right"><HeaderRight/></div>

            <div className="iw_header__responsiveBar">
                <i className="i__logout fas fa-sign-out-alt" style={{display: showLogoutIcon && isAuth ? "block" : "none"}} onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }}></i>
                <i className="i__bars fas fa-bars" onClick={showNav}></i>
            </div>
        </header>
    )
}

export default Header