import {Router} from "express";
const router = Router();

router.post("/register", (req, res) => {
    const {username, email, confirmemail, password, confirmpassword} = req.body;

    console.log(req.body);
})

export default router;