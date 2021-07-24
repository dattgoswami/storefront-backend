// import { isParameterPropertyDeclaration } from "typescript";
// import Client from "../database";
// import bcrypt from "bcrypt";

// export type User = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   password: string;
// };

// export class UserCollection {
//   async index(): Promise<User[]> {
//     try {
//       // @ts-ignore
//       const conn = await Client.connect();
//       const sql = "SELECT * FROM users";

//       const result = await conn.query(sql);

//       conn.release();

//       return result.rows;
//     } catch (err) {
//       throw new Error(`Could not get products. Error: ${err}`);
//     }
//   }
//   async show(id: string): Promise<User> {
//     try {
//       const sql = "SELECT * FROM users WHERE id=($1)";
//       // @ts-ignore
//       const conn = await Client.connect();

//       const result = await conn.query(sql, [id]);

//       conn.release();

//       return result.rows[0];
//     } catch (err) {
//       throw new Error(`Could not find user ${id}. Error: ${err}`);
//     }
//   }
//   async create(u: User): Promise<User> {
//     const saltRounds: string = process.env.SALT_ROUNDS as string;
//     const pepper: string = process.env.BCRYPT_PASSWORD as string;
//     try {
//       const sql =
//         "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
//       const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
//       // @ts-ignore
//       const conn = await Client.connect();

//       const result = await conn.query(sql, [u.firstName, u.lastName, hash]);

//       const user = result.rows[0];

//       conn.release();

//       return user;
//     } catch (err) {
//       throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
//     }
//   }
// }
