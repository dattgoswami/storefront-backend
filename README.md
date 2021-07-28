# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.  
  **Example**: A SHOW route: 'blogs/:id' [GET]

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.  
  **Example**: You can format this however you like but these types of information should be provided
  Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2. DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder.

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## Steps to run the project:

### In this setup, postgres is running inside a docker container

1. Clone the project to your local machine and navigate to that directory (all the below mentioned steps need to be performed in your locally cloned project directory)
2. Create a .env file with these variable inside it(change the ENV variable here to test when running tests):
   ENV=dev
   POSTGRES_HOST=postgres
   POSTGRES_DB=storefront_db
   POSTGRES_USER=shopping_user
   POSTGRES_PASSWORD=password123
   POSTGRES_PORT=5432
   POSTGRES_TEST_DB=storefront_test
   BCRYPT_PASSWORD=some-scecret-password
   SALT_ROUNDS=10
   TOKEN_SECRET=some_secret_token
3. Open a terminal window and run command (we are starting our containers for postgres and our server in the same network)
   ```
   docker-compose up
   ```
   It will run command npm run watch (i.e. start the server)
4. Open second terminal window and run the commands (here, we are setting up the database and the user privileges)
   ```
   docker-compose exec postgres bash
   psql -U postgres
   CREATE USER shopping_user WITH PASSWORD 'password123';
   CREATE DATABASE storefront_db;
   CREATE DATABASE storefront_test;
   GRANT ALL PRIVILEGES ON DATABASE storefront_db TO shopping_user;
   GRANT ALL PRIVILEGES ON DATABASE storefront_test TO shopping_user;
   \l
   \c storefront_db
   \dt
   ```
5. Open third terminal window and run the commands (here, we will be running db-migrate firstly and then running the application)
   ```
   docker-compose exec server bash
   npm run migrate
   npm run test
   //npm run watch
   ```
   -> when everything is dockerized the values of the host and post should be postgres and 5432 as they are on the same network and the value of container name will get the ip address that we usually get from docker inspect
   where as when only postgres is dockerized you need the host value 0.0.0.0 and the port as 5555
   when you are running postgres locally host is 127.0.0.1 and port is 5432

### Once the project is up and running we need to test it using postman

1. (CREATE USER)Send a POST request to url [http://0.0.0.0:3000/users/] with body containing raw json
   {
   "firstname": "John",
   "lastname": "Doe",
   "password": "somePassword"
   }
   you will receive a jwt in your response window copy it.
2. Send a GET request to url [http://0.0.0.0:3000/users/] & [http://0.0.0.0:3000/users/1] with the bearer token inside authorization header set to the value of the jwt that was received earlier. You will get a list of all the users that are existing.
3. (CREATE PRODUCT) Send a POST request to url [http://0.0.0.0:3000/products] with the bearer token inside authorization header set to the jwt that was received and the body should contain the following raw json
   {
   "name": "pen",
   "price": "2",
   "category": "stationery"
   }
4. Send a GET request to url [http://0.0.0.0:3000/products/] , [http://0.0.0.0:3000/products/1] , [http://0.0.0.0:3000/five-most-expensive] , [http://0.0.0.0:3000/products/category/stationery] without anything in the authorization header and body.
5. (CREATE ORDER) Send a POST request to url [http://0.0.0.0:3000/orders/] with the bearer token for authorization and raw json in the body
   {
   "user_id": "1",
   "status": "active"
   }
6. (ADD PRODUCT to ORDER) Send a POST request to url [http://0.0.0.0:3000/orders/1/products] without bearer token and this body
   {
   "id": "1",
   "productId": "1",
   "quantity": "2"
   }
7. (CURRENT ORDER) Send a GET request to the [http://0.0.0.0:3000/users/1/orders/active] with the bearer token
