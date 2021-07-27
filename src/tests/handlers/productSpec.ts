import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("test endpoint response", () => {
  it("get products ", async (done) => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
    done();
  });
});
