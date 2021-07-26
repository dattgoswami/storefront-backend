import * as express from "express";
import { User, UserCollection } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyAuthToken from "../middleware/auth";

const store: UserCollection = new UserCollection();
dotenv.config();

const index = async (req: express.Request, res: express.Response) => {
  const orders = await store.index();
  res.json(orders);
};
const show = async (req: express.Request, res: express.Response) => {
  const orders = await store.show(req.params.id);
  res.json(orders);
};
const create = async (req: express.Request, res: express.Response) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    let tokenAuth: string = "";
    if (authorizationHeader !== undefined) {
      token = authorizationHeader.split(" ")[1];
    }
    const decoded = jwt.verify(tokenAuth, process.env.TOKEN_SECRET as string);
  } catch (err) {
    try {
      const user: {
        firstName: string;
        lastName: string;
        password: string;
      } = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      };
      const newUser = await store.create(user);
      var token = jwt.sign(
        { user: newUser },
        process.env.TOKEN_SECRET as string
      );
      res.json(token);
      // res.json(newUser);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
};
/* const authenticate = async (req: express.Request, res: express.Response) => {
  const userName: {
    firstName: string;
    lastName: string;
  } = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  const password: string = req.body.password;
  try {
    const u = await store.authenticate(userName, password);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
}; */

/* const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
} */
//add authentication
const user_routes = (app: express.Application) => {
  //   app.get("/users", index);
  //   app.get("/users/:id", show);
  //   app.post("/users", create);
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  // app.delete('/users', destroy);
};

export default user_routes;
