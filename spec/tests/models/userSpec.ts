import { UserCollection } from "../../../src/models/user";
import sleep from "../../../src/utilities/sleep";

const store = new UserCollection();

beforeAll(async () => {
  const result = await store.create({
    firstname: "John",
    lastname: "Doe",
    password: "somepassword",
  });
});

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  //   it("should create a user", async () => {
  //     const result = await store.create({
  //       firstname: "Peter",
  //       lastname: "Pan",
  //       password: "somepassword123",
  //     });
  //     await sleep(1000);
  //     expect(result.firstname).toEqual("Peter");
  //     expect(result.lastname).toEqual("Pan");
  //   });
  it("should not return single user", async () => {
    const result = await store.show("1");
    expect(result.firstname).toEqual("John");
    expect(result.lastname).toEqual("Doe");
  });
  it("should not return any users", async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });
});
