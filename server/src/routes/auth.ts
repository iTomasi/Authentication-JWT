import {Router} from "express";
import bcrypt from "bcryptjs";
import connection from "../databases/mysql";
import {vCode} from "../config/randomCode";
import jwt from "jsonwebtoken";
import config from "../config/config"
const router = Router();

router.get("/", (req, res) => {
    const tokenHeader: any = req.headers["x-access-token"]

    try {
        const token = jwt.verify(tokenHeader, config.JWT);

        res.json({
            token,
            auth: true
        })

    }

    catch(e) {
        res.json({
            token: {
                id: 0,
                username: "",
                verified: 0,
                email: "",
                theimg: "",
                iat: 0,
                exp: 0
            },

            auth: false
        })
    }
})

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

        connection.query("INSERT INTO accounts (username, email, theimg, password, vcode) VALUE (?,?,?,?,?)", [username, email, "default.jpg", hash, vCode(3)], (err, resp) => {
            if (err) return console.log(err)

            connection.query("SELECT * FROM accounts WHERE id = ?", [resp.insertId], (err, resp2) => {
                if (err) return console.log(err)

                const token = jwt.sign({
                    id: resp2[0].id,
                    username: resp2[0].username,
                    verified: resp2[0].verified,
                    vcode: resp2[0].vcode
                }, config.JWT, {expiresIn: 60*60*24})

                res.json({
                    message: "Registered",
                    token,
                    userData: {
                        username: resp2[0].username,
                        vcode: resp2[0].vcode
                    }
                })
            })
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
});

router.post("/verify-acc", (req, res) => {
    const {code} = req.body;
    const tokenHeader: any = req.headers["x-access-token"]

    try {
        const token: any = jwt.verify(tokenHeader, config.JWT)

        connection.query("SELECT * FROM accounts WHERE id = ?", [token.id], (err, resp) => {
            if (err) return console.log(err);
            if (resp[0] === undefined) return res.json({message: "? XD"});
            else if (resp[0].verified === 1) return res.json({message: "Your account is already verified"});
            else if (code !== resp[0].vcode) return res.json({message: "Your code is invalid"});
            
            connection.query("UPDATE accounts SET verified = 1 WHERE id = ?", [token.id], (err, resp2) => {
                if (err) return console.log(err)

                res.json({
                    message: `${resp[0].username} your account is verified!`,
                    ready: 1
                })
            })
        })
    }

    catch(e) {
        res.json({
            message: "process failed",
            ready: 0
        })
    }
})

export default router;