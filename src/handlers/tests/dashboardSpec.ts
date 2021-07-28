import supertest from "supertest";
import app from "../../server";
import { DashboardQueries } from "../../services/dashboard";

const request = supertest(app);
const token: string = process.env.TOKEN_TEST as string;

describe("dashboard endpoint to get active orders", () => {
  beforeAll(() => {
    spyOn(DashboardQueries.prototype, "activeOrders").and.returnValue(
      Promise.resolve({
        id: 1,
        user_id: "1",
        status: "active",
      })
    );
  });

  it("get active orders endpoint", async () => {
    const res = await request
      .get("/users/1/orders/active")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });
});
