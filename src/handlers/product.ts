import * as express from "express";
import { Product, ProductStore } from "../models/product";
// import verifyAuthToken from '../middleware/auth';

const store: ProductStore = new ProductStore();

const create = async (req: express.Request, res: express.Response) => {
  try {
    const product: { name: string; price: number; category: string } = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct: Product = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const index = async (_req: express.Request, res: express.Response) => {
  const products: Product[] = await store.index();
  res.json(products);
};

const show = async (req: express.Request, res: express.Response) => {
  const product: Product = await store.show(req.params.id);
  res.json(product);
};

const update = async (req: express.Request, res: express.Response) => {
  const product: Product = await store.update(req.params.id, req.body.price);
  res.json(product);
};

const destroy = async (req: express.Request, res: express.Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const fiveMostExpensive = async (
  _req: express.Request,
  res: express.Response
) => {
  const products: { name: string; price: number }[] =
    await store.fiveMostExpensive();
  res.json(products);
};

const productsByCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const products: { name: string; price: number }[] =
    await store.productsByCategory(req.params.categoryValue);
  res.json(products);
};

const product_routes = (app: express.Application) => {
  app.post("/products", create);
  app.get("/products", index);
  app.get("/products/:id", show);
  // app.post('/products', verifyAuthToken, create);
  app.put("/products/:id", update);
  app.delete("/products", destroy);
  app.get("/five-most-expensive", fiveMostExpensive);
  app.get("/products/category/:categoryValue", productsByCategory);
};

export default product_routes;
