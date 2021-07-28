# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- An INDEX route: '/products' [GET]
- A SHOW route: '/products/:id' [GET]
- Create [token required] - A CREATE route: '/products' [POST]
- [OPTIONAL] Top 5 most popular products - A SHOW route: '/five-most-expensive' [GET]
- [OPTIONAL] Products by category (args: product category) - A SHOW route '/products/category/:category' [GET]

#### Users

- Index [token required] - An INDEX route: '/users' [GET]
- Show [token required] - A SHOW route: '/users/:id' [GET]
- Create N - A CREATE route: '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] - A SHOW route: '/user/:id/orders/active' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] - A SHOW route: '/user/:id/orders/complete' [GET]

## Data Shapes

#### Products

- id
- name
- price
- [OPTIONAL] category
  Table: Products (id:number, name:varchar, price:number, category:varchar)

#### Users

- id
- firstName
- lastName
- password
  Table: Users (id:number, firstname:varchar, lastname:varchar, password:varchar)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
  Table: Orders (id:number, user_id:number[foreign key to user table], status:varchar)
  Table: Order_Products (id:number, quantity:number, order_id:number[foreign key to orders table], product_id:number[foreign key to products table])
