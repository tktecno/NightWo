import { Router } from "express";
import { authLogin, authSignup, authSinupRetailer, logoutUser } from "../controller/auth.controller.js";

const Auth = Router();

Auth.post("/api/login", authLogin);
Auth.post("/api/signup", authSignup);
Auth.post("/createRetailer",authSinupRetailer);
Auth.get("/logout",logoutUser);

export default Auth;