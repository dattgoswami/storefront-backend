import { ProductStore } from "../product";
import sleep from "../../utilities/sleep";

const store = new ProductStore();

beforeAll(async () => {
  const result = await store.create({
    name: "pen",
    price: 2,
    category: "stationery",
  });
});

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  /* it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  }); */

  it("create method should add a product", async () => {
    const result = await store.create({
      name: "book",
      price: 3,
      category: "stationery",
    });
    await sleep(500);
    expect(result).toEqual({
      id: 2,
      name: "book",
      price: 3,
      category: "stationery",
    });
  });
  it("show method should return the correct product", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      name: "pen",
      price: 2,
      category: "stationery",
    });
  });
  it("index method should return a list of products", async () => {
    const result = await store.index();
    await sleep(1500);
    expect(result).toEqual([
      {
        id: 1,
        name: "pen",
        price: 2,
        category: "stationery",
      },
      {
        id: 2,
        name: "book",
        price: 3,
        category: "stationery",
      },
    ]);
  });

  /*   it("delete method should remove the product", async () => {
    store.delete("1");
    const result = await store.index();

    expect(result).toEqual([]);
  }); */
});
