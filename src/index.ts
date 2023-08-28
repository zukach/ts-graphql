import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import typeormConfig from "./typeorm.config";
import { Context } from "./types/Context";
import { User } from "./entities/User";

const boot = async () => {
  const conn = await typeormConfig.initialize();  

  const server = new ApolloServer({
    schema,
    context: (): Context => ({ conn }),
  });

  server.listen(5002).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

boot();