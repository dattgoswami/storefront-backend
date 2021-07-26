import { isParameterPropertyDeclaration } from "typescript";
import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserCollection {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT id, firstname, lastname FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT id, firstname, lastname FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(u: {
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<User> {
    const saltRounds: string = process.env.SALT_ROUNDS as string;
    const pepper: string = process.env.BCRYPT_PASSWORD as string;
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`);
    }
  }

  /*   async authenticate(
    username: { firstName: string; lastName: string },
    password: string
  ): Promise<User | null> {
    const pepper: string = process.env.BCRYPT_PASSWORD as string;
    const conn = await Client.connect();
    const sql =
      "SELECT password_digest FROM users WHERE firstName=($1) AND lastName=($2)";

    const result = await conn.query(sql, [
      username.firstName,
      username.lastName,
    ]);

    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  } */
}
