import { UserCollection } from "../../../src/models/user";
import sleep from "../../../src/utilities/sleep";

const store = new UserCollection();

describe("User Model", () => {
  beforeAll(async () => {
    const result = await store.create({
      firstname: "John",
      lastname: "Doe",
      password: "somepassword",
    });
  });
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should create a user", async () => {
    const result = await store.create({
      firstname: "Peter",
      lastname: "Pan",
      password: "somepassword123",
    });
    await sleep(500);
    expect(result.firstname).toEqual("Peter");
    expect(result.lastname).toEqual("Pan");
  });
  it("should only return single user", async () => {
    const result = await store.show("1");
    await sleep(1000);
    expect(result.firstname).toEqual("John");
    expect(result.lastname).toEqual("Doe");
  });
  it("should return all users", async () => {
    const result = await store.index();
    await sleep(3000);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
