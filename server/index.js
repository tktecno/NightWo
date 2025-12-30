import Express from "express";
import cors from "cors";
import Retailer from "./router/retailer.routes.js";
import Auth from "./router/auth.routes.js";
import { db } from "./db/drizzle.js";
import { imgTable, productTable, userTable } from "./db/schema.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { IsAuth } from "./controller/auth.controller.js";
import { eq, inArray } from "drizzle-orm";

const app = Express();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use(Express.json());
app.use(cookieParser(process.env.COOKIE_KEY));

app.use(IsAuth);
app.use("/uploads", Express.static("uploads"));







app.get("/", (req, res) => {
  if (!req.user) {
    return res.json({ loggedIn: false });
  }
  if (req.retailer) {
    return res.json({ loggedIn: true, user: req.user, retailer: req.retailer });
  }
  res.json({ loggedIn: true, user: req.user });
});

const joinproductimage = async (products) => {
  const ids = products.map(p => p.id);
  const images = await db
    .select()
    .from(imgTable)
    .where(inArray(imgTable.product_id, ids));

  const productMap = {};
  for (let p of products) {
    productMap[p.id] = { ...p, images: [] };
  }
  for (let img of images) {
    if (productMap[img.product_id]) {
      productMap[img.product_id].images.push(img.img);
    }
  }
  return Object.values(productMap);
}
app.get("/getallproducts", async (req, res) => {
  try {
    const products = await db
      .select()
      .from(productTable);
    const productMap = await joinproductimage(products);
    res.json(productMap);
  }
  catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})


app.get("/getproducts", async (req, res) => {
  try {
    const user = req?.retailer;
    if (!user) return res.status(401).json({ message: "Unauthorized" });


    const products = await db
      .select()
      .from(productTable)
      .where(eq(productTable.sellerID, user.id));

    if (!products.length) return res.json([]);

    // const ids = products.map(p => p.id);
    // const images = await db
    //   .select()
    //   .from(imgTable)
    //   .where(inArray(imgTable.product_id, ids));

    // const productMap = {};
    // for (let p of products) {
    //   productMap[p.id] = { ...p, images: [] };
    // }
    // for (let img of images) {
    //   if (productMap[img.product_id]) {
    //     productMap[img.product_id].images.push(img.img);
    //   }
    // }
    const productMap = await joinproductimage(products);
    res.json(productMap);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.use(Auth);
app.use(Retailer);















app.listen(3000, () => console.log("Server Running on Port 3000"));