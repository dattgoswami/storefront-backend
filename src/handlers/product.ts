import { Request, Response, Application } from "express";
import { Product, ProductStore } from "../models/product";
import verifyAuthToken from "../middleware/auth";

const store: ProductStore = new ProductStore();

const create = async (req: Request, res: Response) => {
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

const index = async (_req: Request, res: Response) => {
  const products: Product[] = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product: Product = await store.show(req.params.id);
  res.json(product);
};

const update = async (req: Request, res: Response) => {
  const product: Product = await store.update(req.params.id, req.body.price);
  res.json(product);
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const productsByCategory = async (req: Request, res: Response) => {
  const products: { name: string; price: number }[] =
    await store.productsByCategory(req.params.categoryValue);
  res.json(products);
};

const product_routes = (app: Application) => {
  app.post("/products", verifyAuthToken, create);
  app.get("/products", index);
  app.get("/products/:id", show);
  app.put("/products/:id", update); //extra
  app.delete("/products", destroy); //extra
  app.get("/products/category/:categoryValue", productsByCategory);
};

export default product_routes;
