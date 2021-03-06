-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS orgs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (255) NOT NULL
);

CREATE TABLE orgs (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  org_id INTEGER REFERENCES orgs (id) ON DELETE CASCADE,
  name VARCHAR (255) NOT NULL,
  email VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories (id) ON DELETE CASCADE,
  org_id INTEGER REFERENCES orgs (id) ON DELETE CASCADE,
  name VARCHAR (255) NOT NULL,
  url VARCHAR (255) NOT NULL,
  username VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL
);
