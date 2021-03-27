import express from "express";
import cors from "cors";
import path from "path";
import routeAuth from "./routes/auth";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/auth", routeAuth);


app.listen(port, () => console.log(`SV ON PORT ${port}`));