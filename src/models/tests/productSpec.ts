// import { Product, ProductStore } from "../product";

// const store = new ProductStore();

// describe("Product Model", () => {
//   it("should have an index method", () => {
//     expect(store.index).toBeDefined();
//   });

//   it("should have a show method", () => {
//     expect(store.show).toBeDefined();
//   });

//   it("should have a create method", () => {
//     expect(store.create).toBeDefined();
//   });
//   /*
//   it("should have a update method", () => {
//     expect(store.index).toBeDefined();
//   });
// */
//   it("should have a delete method", () => {
//     expect(store.delete).toBeDefined();
//   });

//   it("create method should add a product", async () => {
// const result = await store.create({
//   id: 1,
//   name: "pen",
//   price: 25,
//   category: "stationery",
// });
//     expect(result).toEqual({
//       id: 1,
//       name: "pen",
//       price: 25,
//       category: "stationery",
//     });
//   });

//   it("index method should return a list of products", async () => {
//     const result = await store.index();
//     expect(result).toEqual([
//       {
//         id: 1,
//         name: "pen",
//         price: 25,
//         category: "stationery",
//       },
//     ]);
//   });

//   it("show method should return the correct product", async () => {
//     const result = await store.show("1");
//     expect(result).toEqual({
//       id: 1,
//       name: "pen",
//       price: 25,
//       category: "stationery",
//     });
//   });

//   it("delete method should remove the book", async () => {
//     store.delete("1");
//     const result = await store.index();

//     expect(result).toEqual([]);
//   });
// });
