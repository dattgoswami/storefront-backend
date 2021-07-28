import supertest from "supertest";
import app from "../../../src/server";
import { OrderCollection } from "../../../src/models/order";

const request = supertest(app);
const token: string = process.env.TOKEN_TEST as string;

describe("orders endpoint response test suite", () => {
  beforeAll(() => {
    spyOn(OrderCollection.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        user_id: "1",
        status: "active",
      })
    );
  });

  it("post order creation endpoint", async () => {
    const res = await request
      .post("/orders")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });
});
