import Client from "../database";

export class DashboardQueries {
  // Get all users that have made orders
  async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products ORDER BY price DESC LIMIT 5";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    }
  }

  // Get all users that have made orders
  async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        "SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        "SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.product_id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  async completedOrders(id: string): Promise<{}> {
    try {
      const conn = await Client.connect();
      //   const sql = "SELECT * FROM orders WHERE status='complete' AND user_id = $1";
      const sql =
        "SELECT order_id, user_id, product_id, quantity, status FROM order_products INNER JOIN orders ON orders.id = order_products.order_id WHERE status='complete' AND orders.user_id =($1) ";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find completed orders ${id}. Error: ${err}`);
    }
  }
  async activeOrders(id: string): Promise<{}> {
    try {
      const conn = await Client.connect();
      //   const sql = "SELECT * FROM orders WHERE status='active' AND user_id = $1";

      const sql =
        "SELECT order_id, user_id, product_id, quantity, status FROM order_products INNER JOIN orders ON orders.id = order_products.order_id WHERE status='active' AND orders.user_id =($1) ";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find active orders ${id}. Error: ${err}`);
    }
  }
}
