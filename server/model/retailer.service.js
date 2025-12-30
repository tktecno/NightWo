import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { imgTable, productTable } from "../db/schema.js";

export const DeleteOne = async (id) => {
    await db
        .delete(productTable)
        .where(eq(productTable.id, Number(id)));
};

export const DeleteMany = async (ids)=>{
    ids.map(async (curr) => {
        await db
        .delete(productTable)
        .where(eq(productTable.id, curr));
    });
};

export const AddImage = async ({img, product_id})=>{

    try {
        await db
        .insert(imgTable)
        .values({img, product_id});
    } catch (error) {
        throw new Error("Unable to load");
    }
}