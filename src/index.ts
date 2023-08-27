import { ApolloServer } from "apollo-server";
import { schema } from "./schema";

const boot =  () => {
  const server = new ApolloServer({
    schema,
  });

  server.listen(5001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

boot();