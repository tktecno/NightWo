import { eq, exists } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { emailTableUser, retailerTable, userTable } from "../db/schema.js";
import argon from "argon2";
import { emailTableRetailer } from "../db/schema.js";



export const authcreate = async ({ name, email, password }) => {
  const existing = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (existing.length) {
    throw new Error("User already exists");
  }
  const hashed = await argon.hash(password);

  const [{id}] = await db.insert(userTable).values({
    name,
    email,
    password: hashed
  }).$returningId();
  await db.insert(emailTableUser).values({email,userid:id});
  return { name, email ,id};
};

export const authcreateRetailer = async ({companyName, name, city, state, address, email, phone, password,userid }) => {
  const existingemail = await db
  .select()
  .from(retailerTable)
  .where(eq(retailerTable.email,email));
  if(existingemail.length){
    throw new Error("Email already exists");
  }
  const existingphone = await db
  .select()
  .from(retailerTable)
  .where(eq(retailerTable.phone,phone));
  if(existingphone.length){
    throw new Error("Phone already exists");
  }
  const hashed = await argon.hash(password);

  const [{id}] = await db
  .insert(retailerTable)
  .values({companyName, name, city, state, address, email, phone, password:hashed,userid}).$returningId();

  await db.insert(emailTableRetailer).values({email,userid:id});
  return id;
}
export const AuthenticationLogin = async ({ email, password }) => {
  const existing = await db.select().from(userTable).where(eq(userTable.email, email));
  if (!existing.length) throw new Error("User Does't Existed !");

  const checkpass = await argon.verify(existing[0].password, password);
  if (!checkpass) throw new Error("Credential Not Found !");

  const existingretailer = await db.select().from(retailerTable).where(eq(retailerTable.userid,existing[0].id));
  let retail = {name:"",email:"",id:null};
  if(existingretailer.length)
  {
    retail.name = existingretailer[0].name;
    retail.email = existingretailer[0].email;
    retail.id = existingretailer[0].id;
  }
  return { name: existing[0].name,id:existing[0].id,retail };
}

export const authCreateEmail = () => {

}
export const authCreateRetailerEmail = () => {

}