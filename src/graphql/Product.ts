import { floatArg, nonNull, objectType, stringArg } from "nexus";
import { extendType } from "nexus";
import { Product } from "../entities/Products";

export const ProductType = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.int("id"), t.nonNull.string("name"), t.nonNull.float("price");
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
      resolve(_parent, _args, _ctx, _info) : Promise<Product[]> {
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
      resolve(_parent, args, _ctx, _info) : Promise<Product> {
        const { name, price } = args;
        return Product.create({ name, price }).save();
        
      },
    });
  },
});
