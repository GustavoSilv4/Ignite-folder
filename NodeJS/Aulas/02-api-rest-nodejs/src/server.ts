import fastify from "fastify";
import { knex } from "./database";
import { env } from "./env";

const app = fastify();

app.get("/hello", async (req, reply) => {
  const transaction = await knex("transactions")
    .where("amount", 1000)
    .select("*");

  return transaction;
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running on port ${env.PORT}`);
  });
