import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import verifyAuthToken from "../middleware/auth";

const dashboard = new DashboardQueries();

const fiveMostExpensive = async (_req: Request, res: Response) => {
  const users = await dashboard.fiveMostExpensive();
  res.json(users);
};

const usersWithOrders = async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
};

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const completedOrders = async (req: Request, res: Response) => {
  const orders = await dashboard.completedOrders(req.params.id);
  res.json(orders);
};

const activeOrders = async (req: Request, res: Response) => {
  const orders = await dashboard.activeOrders(req.params.id);
  res.json(orders);
};

const dashboard_routes = (app: express.Application) => {
  app.get("/five-most-expensive", fiveMostExpensive);
  app.get("/users-with-orders", usersWithOrders); //extra
  app.get("/products-in-orders", productsInOrders); //extra
  app.get("/user/:id/orders/complete", verifyAuthToken, completedOrders);
  app.get("/users/:id/orders/active", verifyAuthToken, activeOrders);
};

export default dashboard_routes;
