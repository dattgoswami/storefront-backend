import express, { Request, Response, Application } from "express";
import { User, UserCollection } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyAuthToken from "../middleware/auth";

const store: UserCollection = new UserCollection();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: express.Response) => {
  try {
    const orders = await store.show(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const user: {
      firstname: string;
      lastname: string;
      password: string;
    } = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
    // res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
/* const authenticate = async (req: Request, res: Response) => {
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

const user_routes = (app: Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  // app.delete('/users', destroy);
};

export default user_routes;
