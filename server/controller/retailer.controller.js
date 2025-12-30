import { productTable, retailerTable, userTable } from "../db/schema.js";
import { db } from "../db/drizzle.js";
import { AddImage, DeleteMany, DeleteOne } from "../model/retailer.service.js";

export const RetailerAddIteam = async (req, res) => {
    if(!req?.retailer) return res.json({success:false, message:" Login first"});
    const {name,id} = req.retailer;
    

    console.log(req.body);
    const v = req.body;
    const aid = await db.insert(productTable).values({
        article: v.article,
        artical_id: v.artical_id,
        description: v.description || "nothinig here",
        categorie: v.categorie,
        instock: v.in_stock,
        price: v.price,
        sellerID: id,
        sellerName: name,
    }).$returningId();

    res.json({
        success: true, message: "Iteam Added success! ",
        data: { ...req.body, id: aid[0].id },
    });
}

export const RetailerDeleteProduct = async (req, res) => {
    const id = req?.query?.id || null;
    const rawids = req.query["ids[]"] || [];
    const ids = Array.isArray(rawids) ? rawids.map(Number) : [Number(rawids)];
    try {

        if (id) {
            DeleteOne(id);
        }
        else if (ids.length) {
            DeleteMany(ids);
        }
        res.json({ message: "Delete Operation Success" });

    }
    catch (error) {
        res.json({ message: error });
    }
}

export const AddImg = async (req, res)=>{
    if(!req?.retailer) return res.json({success:false, message:" Login first"});
    
    const img = req.file?.filename;
    const product_id = Number(req.body?.productId);
    if(!img || !product_id) return res.json({message:"Image May Not Found"});

    try {
        await AddImage({img, product_id});
    } catch (error) {
        return res.json({message:error});
    }

    res.json({message:"Image Uploaded"});
}