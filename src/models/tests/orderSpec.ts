import { OrderCollection } from "../order";
import sleep from "../../utilities/sleep";

const store = new OrderCollection();

// beforeAll(async () => {
//   const result = await store.create({
//     user_id: "1",
//     status: "active",
//   });
//   //   const result_2 = await store.addProduct(2, "1", "1");
// });

describe("Order Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  //   it("show method should return the correct order", async () => {
  //     const result = await store.show("1");
  //     await sleep(250);
  //     expect(result).toEqual({
  //       id: 1,
  //       user_id: "1",
  //       status: "active",
  //     });
  //   });
});
