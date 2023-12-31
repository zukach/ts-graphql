import { floatArg, nonNull, objectType, stringArg } from "nexus";
import { extendType } from "nexus";
import { Product } from "../entities/Products";
import { Context } from "../types/Context";
import { User } from "../entities/User";

export const ProductType = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("name"),
      t.nonNull.float("price"),
      t.nonNull.int("creatorId"),
      t.nonNull.field("creator", {
        type: "User",
        resolve(parent, _args, _context: Context, _info): Promise<User | null> {
          return User.findOne({ where: { id: parent.creatorId } });
        },
      });
  },
});

// let products: NexusGenObjects["Product"][] = [
//   { id: 1, name: "Apple", price: 1.99 },
//   { id: 2, name: "Orange", price: 2.99 },
// ];

export const ProductsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("products", {
      type: "Product",
      resolve(_parent, _args, _context: Context, _info): Promise<Product[]> {
        // const { conn } = _context;
        // return conn.query(`select * from product`);
        return Product.find();
      },
    });
  },
});

export const ProductMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createProduct", {
      type: "Product",
      args: {
        name: nonNull(stringArg()),
        price: nonNull(floatArg()),
      },
      resolve(_parent, args, _ctx, _info): Promise<Product> {
        const { name, price } = args;
        const { userId } = _ctx;

        if (!userId) throw new Error("Not authenticated");

        return Product.create({ name, price, creatorId: userId }).save();
      },
    });
  },
});
