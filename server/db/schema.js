import { int, varchar, mysqlTable, boolean, datetime } from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";

  
  /**
   * Notes:
   * - I kept numeric PKs as ints/autoincrement as in your original.
   * - Sessions now include a `token` varchar (better for JWT/opaque tokens).
   * - sellerName is stored as plain varchar (denormalized); sellerID references retailer.id.
   */
  
  // --- users
  export const userTable = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),

  });
  
  // --- retailer
  export const retailerTable = mysqlTable("retailer", {
    id: int("id").autoincrement().primaryKey(),
    companyName: varchar("company_name", { length: 255 }),
    name: varchar("name", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    state: varchar("state", { length: 255 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone",{length:10}).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    userid: int("user_id").references(()=>userTable.id,{onDelete:"cascade",onUpdate:"cascade"}),
    createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),

  });
  
  // --- products
  export const productTable = mysqlTable("products", {
    id: int("id").autoincrement().primaryKey(),
    article: varchar("article", { length: 255 }).notNull(),
    artical_id: varchar("artical_Id", { length: 255 }), // consider renaming article_id
    price: int("price").notNull(),
    instock: int("in_Stock").notNull(),
    categorie: varchar("categorie", { length: 255 }).notNull(),
    description: varchar("description",{length:1000}).default(""),
    // denormalized snapshot of seller name
    sellerName: varchar("seller_name", { length: 255 }).notNull(),
    sellerID: int("seller_id")
      .notNull()
      .references(() => retailerTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
      createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
      updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),

  });
  export const imgTable = mysqlTable("img_table",{
    id: int("id").autoincrement().primaryKey(),
    img: varchar("img",{length:990}).notNull(),
    product_id: int("product_id").references(()=> productTable.id,{
      onDelete: "cascade",
      onUpdate: "cascade"
    } )
  })
  
  // --- user emails
  export const emailTableUser = mysqlTable("user_emails", {
    id: int("id").autoincrement().primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    verified: boolean("is_Verified").default(false),
    userid: int("user_id").references(() => userTable.id, {
      onDelete: "cascade",
    }),
    createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),

  });
  
  // --- retailer emails
  export const emailTableRetailer = mysqlTable("retailer_emails", {
    id: int("id").autoincrement().primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    verified: boolean("is_Verified").default(false),
    userid: int("user_id").references(() => retailerTable.id, {
      onDelete: "cascade",
    }),
    createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),

  });
  
  // --- sessions
  export const session = mysqlTable("session", {
    // sessions are commonly tokens (string). I changed to token varchar to match modern usage.
    sessionId: int("session_id").autoincrement().primaryKey(),
    userid: int("userid").notNull().references(() => userTable.id),
    token: varchar("token", { length: 500 }).notNull(),
    ip: varchar("ip_address", { length: 45 }).default(""),
    userAgent: varchar("user_agent", { length: 500 }).default(""),
    createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    expiresAt: datetime("expires_at").notNull(),
  });
  
  // --- relations
  export const userRelation = relations(userTable, ({ many }) => ({
    session: many(session),
    emailverfy: many(emailTableUser),
  }));
  
  export const sessionRelations = relations(session, ({ one }) => ({
    user: one(userTable, {
      fields: [session.userid],
      references: [userTable.id],
    }),
  }));
  
  export const retailerRelations = relations(retailerTable, ({ many }) => ({
    products: many(productTable),
    emailverify: many(emailTableRetailer),
  }));
  
  export const productsRelations = relations(productTable, ({ one }) => ({
    seller: one(retailerTable, {
      fields: [productTable.sellerID],
      references: [retailerTable.id],
    }),
  }));
  
  export const emailuserRelation = relations(emailTableUser, ({ one }) => ({
    verify: one(userTable, {
      fields: [emailTableUser.userid],
      references: [userTable.id],
    }),
  }));
  
  export const emailretailerRelation = relations(emailTableRetailer, ({ one }) => ({
    verify: one(retailerTable, {
      fields: [emailTableRetailer.userid],
      references: [retailerTable.id],
    }),
  }));

  export const productsRelationsMany = relations(productTable,({many})=>({
    img : many(imgTable),
  }))
  export const imgRelations = relations(imgTable,({one})=>({
    product : one(productTable,{
      fields: [ imgTable.product_id],
      references: [productTable.id],
    })
  }))
  export const UserToRetailer = relations(userTable,({one})=>({
    retailer: one(retailerTable),
  }))
  export const RetailerToUser = relations(retailerTable,({one})=>({
    user: one(userTable,{
      fields :[retailerTable.userid],
      references:[userTable.id]
    })
  }))
  