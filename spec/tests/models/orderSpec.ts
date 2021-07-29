import { OrderCollection } from "../../../src/models/order";
import { ProductStore } from "../../../src/models/product";
import { UserCollection } from "../../../src/models/user";
import sleep from "../../../src/utilities/sleep";

const store = new OrderCollection();
describe("Order Model check if the methods exist", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
});

describe("Order Model crud method test suites", () => {
  const product = new ProductStore();
  const user = new UserCollection();

  beforeAll(async () => {
    await user.create({
      firstname: "John",
      lastname: "Doe",
      password: "somepassword",
    });
    await product.create({
      name: "pen",
      price: 2,
      category: "stationery",
    });
    await store.create({
      user_id: "1",
      status: "active",
    });
  });

  it("create order test", async () => {
    const result = await store.create({
      user_id: "1",
      status: "active",
    });
    await sleep(2000);
    expect(result.status).toEqual("active");
  });
  it("show method should return single order", async () => {
    const result = await store.show("1");
    await sleep(3000);
    expect(result.status).toEqual("active");
  });
  it("index method should return all orders", async () => {
    const result = await store.index();
    await sleep(3000);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it("add product to order", async () => {
    const result = await store.addProduct(2, "1", "1");
    await sleep(2000);
  });
});
