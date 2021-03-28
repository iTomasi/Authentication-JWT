import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `uploaded__${Date.now()}${path.extname(file.originalname)}`)
    },
    destination: path.join(__dirname, "../../public")
})

const userPicture_multer = multer({storage}).single("imgInput");

export {userPicture_multer}