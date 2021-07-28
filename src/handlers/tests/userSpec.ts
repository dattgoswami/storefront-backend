import supertest from "supertest";
import app from "../../server";
import { UserCollection } from "../../models/user";

const request = supertest(app);
const token: string = process.env.TOKEN_TEST as string;

describe("users endpoint response test suite", () => {
  beforeAll(() => {
    spyOn(UserCollection.prototype, "index").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          firstname: "John",
          lastname: "Doe",
          password: "somepassword",
        },
      ])
    );
    spyOn(UserCollection.prototype, "show").and.returnValue(
      Promise.resolve({
        id: 1,
        firstname: "John",
        lastname: "Doe",
        password: "somepassword",
      })
    );
    spyOn(UserCollection.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        firstname: "John",
        lastname: "Doe",
        password: "somepassword",
      })
    );
  });

  it("get all users index endpoint", async () => {
    const res = await request
      .get("/users")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        password: "somepassword",
      },
    ]);
  });

  it("get specific users show endpoint", async () => {
    const res = await request
      .get("/users/1")
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      firstname: "John",
      lastname: "Doe",
      password: "somepassword",
    });
  });

  it("post user creation endpoint", async () => {
    const res = await request.post("/users");
    expect(res.status).toBe(200);
  });
});
