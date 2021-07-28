import supertest from "supertest";
import app from "../../server";
import { ProductStore } from "../../models/product";

const request = supertest(app);
const token: string = process.env.TOKEN_TEST as string;

describe("products endpoint response test suite", () => {
  beforeAll(() => {
    spyOn(ProductStore.prototype, "index").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          name: "pen",
          price: 2,
          category: "stationery",
        },
      ])
    );
    spyOn(ProductStore.prototype, "show").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "pen",
        price: 2,
        category: "stationery",
      })
    );
    spyOn(ProductStore.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "pen",
        price: 2,
        category: "stationery",
      })
    );
  });

  it("gets products index endpoint", async () => {
    const res = await request.get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        name: "pen",
        price: 2,
        category: "stationery",
      },
    ]);
  });

  it("gets product show endpoint", async () => {
    const res = await request.get("/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "pen",
      price: 2,
      category: "stationery",
    });
  });

  it("post product creation endpoint", async () => {
    const res = await request
      .post("/products")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "pen",
      price: 2,
      category: "stationery",
    });
  });
});
