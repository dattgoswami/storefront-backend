import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("test endpoint response", () => {
  it("get orders ", async (done) => {
    const response = await request.get("/orders");
    expect(response.status).toBe(200);
    done();
  });
});
