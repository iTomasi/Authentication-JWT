import {Router} from "express";
import path from "path";
const router = Router();

router.get("/img/:file", (req, res) => {
    const file = req.params.file

    res.sendFile(path.join(__dirname, `../../public/${file}`))
})

export default router;
