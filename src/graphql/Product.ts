import { floatArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";
import { extendType } from "nexus";

export const ProductType = objectType({
  name: "Product",
  definition(t) {
    t.nonNull.int("id"), t.nonNull.string("name"), t.nonNull.float("price");
  },
});

let products: NexusGenObjects["Product"][] = [
  { id: 1, name: "Apple", price: 1.99 },
  { id: 2, name: "Orange", price: 2.99 },
];

export const ProductsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("products", {
      type: "Product",
      resolve(_parent, _args, _ctx, _info) {
        return products;
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
      resolve(_parent, args, _ctx, _info) {
        const { name, price } = args;
        const product = {
          id: products.length + 1,
          name,
          price,
        };
        products.push(product);
        console.log(products);
        return product;
      },
    });
  },
});
