import fastify from "fastify";
import { knex } from "./database";

const app = fastify();

app.get("/hello", async (req, reply) => {
  const transaction = await knex("transactions")
    .where("amount", 1000)
    .select("*");

  return transaction;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP Server Running on port 3333");
  });
