import Axios from "axios";

export const isAuthenticated = () => {
    const tokenStorage: any = localStorage.getItem("token")

    return Axios.get("http://localhost:4000/auth/", {
        headers: {"x-access-token": tokenStorage}
    })
        .then(res => {
            return res
        })
}