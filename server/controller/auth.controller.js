import { AuthenticationLogin, authcreate, authcreateRetailer } from "../model/auth.service.js";
import jwt from "jsonwebtoken";

export const decode = (str)=>{
  return jwt.verify(str,process.env.COOKIE_KEY);
}

export const IsAuth = (req, res, next) => {

  const token = req.cookies?.user;
  const tokenRe = req.cookies?.retailer;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = decode(token); // ✅ SAFE
    if(tokenRe)
    {
      req.retailer = decode(tokenRe);
    }
  } catch (err) {
    req.user = null;
    req.retailer =null;
  }

  next();
}

export const authLogin = async (req, res) => {
  if (req.user) return res.json({ success: false, message: "Already Loggdin " });
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }
  try {

    const { name, id,retail} = await AuthenticationLogin({ email, password });

    const user = {name,email,id};
    const token = jwt.sign(user, process.env.COOKIE_KEY, { expiresIn: "1d" });
    res.cookie("user", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax"
    })
    if(retail.id){
      const seller = { name:retail.name , email:retail.email , id: retail.id}
      const tokenRe = jwt.sign(seller, process.env.COOKIE_KEY, { expiresIn: "1d" });

      res.cookie("retailer", tokenRe, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax"
    })
    return res.json({success: true, message: "Logged in", redirect: "/", user, seller});
    }
    return res.json({ success: true, message: "Logged in", redirect: "/", user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const authSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const {id} = await authcreate({ name, email, password });
    const token = jwt.sign(
      { name, email , id},
      process.env.COOKIE_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("user", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax"
    });
    return res.json({ success: true, message: "Account created" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};




export const authSinupRetailer = async (req, res) => {
  if(!req.user) return res.json({message:"Loggin Required"});

  const { companyName, name, city, state, address, email, phone, password } = req.body;

  try {
    const id = await authcreateRetailer({ companyName, name, city, state, address, email, phone, password,userid:req.user.id });

    const token = jwt.sign({id, name,email},process.env.COOKIE_KEY,{expiresIn:"1d"});

    res.cookie("retailer",token,{
      httpOnly: true,
      maxAge: 24*60*60*1000,
      sameSite: "lax"
    });
    return res.json({ message: "Retailer Account Created Succesfully" });
  } catch (error) {
    throw new Error(error.message);
  }
}








export const authEmail = (req, res) => {

}
export const authRetailerEmail = (req, res) => {

}

export const logoutUser = (req, res) =>{
  if(!req.user) return res.json({message:"User Must Login Fist"});
  res.clearCookie("user");
  res.clearCookie("retailer");
  res.json({message:"User Logout"})
}