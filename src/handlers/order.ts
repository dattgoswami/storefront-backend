import { Request, Response, Application } from "express";
import verifyAuthToken from "../middleware/auth";
import { Order, OrderCollection } from "../models/order";

const store: OrderCollection = new OrderCollection();

const create = async (req: Request, res: Response) => {
  try {
    const order: { user_id: string; status: string } = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const newProduct: Order = await store.create(order);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const orders: Order[] = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order: Order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/* const update = async (req: Request, res: Response) => {
  const order: Order = await store.update(req.params.id, req.body.status);
  res.json(order);
}; */

/* const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
}; */

const addProduct = async (req: Request, res: Response) => {
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

const order_routes = (app: Application) => {
  app.post("/orders", verifyAuthToken, create);
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders/:id/products", addProduct);
};

export default order_routes;
