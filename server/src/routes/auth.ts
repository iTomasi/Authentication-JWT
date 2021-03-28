import {Router} from "express";
import bcrypt from "bcryptjs";
import connection from "../databases/mysql";
import {vCode} from "../config/randomCode";
import jwt from "jsonwebtoken";
import config from "../config/config"
const router = Router();

router.post("/register", (req, res) => {
    const {username, email, confirmemail, password, confirmpassword} = req.body;

    if (username === "" || email === "" || confirmemail === "" || password === "" || confirmpassword === "" || !username || !email || !confirmemail || !password || !confirmpassword) {
        res.json({message: "Datas missing"})
        return
    }

    connection.query("SELECT * FROM accounts WHERE username = ?", [username], async (err, resp) => {
        if (err) return console.log(err)
        if (resp[0] !== undefined) return res.json({message: "Username already registered"})
        else if (email !== confirmemail) return res.json({message: "Email are not same"});
        else if (password !== confirmpassword) return res.json({message: "Password are not same"});

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        connection.query("INSERT INTO accounts (username, email, password, vcode) VALUE (?,?,?,?)", [username, email, hash, vCode(3)], (err, resp) => {
            if (err) return console.log(err)

            res.json({message: "Registered"})
        })

    })
})

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    connection.query("SELECT * FROM accounts WHERE username = ? OR email = ?", [username, username], async (err, resp) => {
        if (err) return console.log(err)
        if (resp[0] === undefined) return res.json({message: "User not found"});
        else if (resp[0].verified === 0) return res.json({message: "Your account is not verified"});

        const compare = await bcrypt.compare(password, resp[0].password);
        
        if (!compare) return res.json({message: "Password wrong"});

        const token = jwt.sign({
            id: resp[0].id,
            username: resp[0].username,
            verified: resp[0].verified,
            email: resp[0].email,
            theimg: resp[0].theimg
        }, config.JWT, {expiresIn: 60*60*24})

        res.json({
            message: "Logged",
            token,
            auth: true
        })

    })
})

export default router;