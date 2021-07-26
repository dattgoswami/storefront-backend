import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import user_routes from "./handlers/user";
import product_routes from "./handlers/product";
// import Client from "./database";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";
app.use(cors());
app.use(bodyParser.json());

// Client.connect()
//   .then(() => console.log("connected"))
//   .catch((err) => console.error("connection error", err.stack));

// console.log(client.config);
app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

product_routes(app);
user_routes(app);
//order_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
