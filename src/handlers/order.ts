import * as express from "express";
import { Order, OrderCollection } from "../models/order";

const store: OrderCollection = new OrderCollection();

const create = async (req: express.Request, res: express.Response) => {
  try {
    const order: { user_id: string; status: string } = {
      user_id: req.body.name,
      status: req.body.status,
    };
    const newProduct: Order = await store.create(order);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const orders: Order[] = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const order: Order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/* const update = async (req: express.Request, res: express.Response) => {
  const order: Order = await store.update(req.params.id, req.body.status);
  res.json(order);
}; */

/* const destroy = async (req: express.Request, res: express.Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
}; */

const addProduct = async (req: express.Request, res: express.Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_routes = (app: express.Application) => {
  app.post("/orders", create); //extra
  app.get("/orders", index); //extra
  app.get("/orders/:id", show); //extra
  app.post("/orders/:id/products", addProduct); //extra
};

export default order_routes;
