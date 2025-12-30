import { Router } from "express";
import { AddImg, RetailerAddIteam, RetailerDeleteProduct } from "../controller/retailer.controller.js";
import path from "path"
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");   // make sure folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

const app = Router();
app.get("/deleteProduct", RetailerDeleteProduct);
app.post("/addItem", RetailerAddIteam);
app.post("/AddImage", upload.single("img"), AddImg);


export default app;