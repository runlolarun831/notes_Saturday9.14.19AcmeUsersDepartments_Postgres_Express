//this is final code from video#10 Using UUID library
const pg = require('pg');//
const uuid = require('uuid');// library for making UUIDs in terminal-->  npm install uuid
const { Client } = pg;//bring destructed postgres client

//this is going to connect to our postgres database w/ connection string
const client = new Client('postgres://localhost/the_acme_db');

//need client to connect to the postgres database
client.connect();

//make a simple script of strings(...names) to give ids by using .reduce()
//these gUUIDs will change everytime our app changes
const generateIds = (...names)=> {
  return names.reduce((acc, name)=> {
    acc[name] = uuid.v4();
    return acc;
  }, {});
};

//these need ids
const ids = generateIds('foo_category','bar_category','foo_1', 'foo_2', 'bar_1');

// hardcode part of SQL to our db.js file change "foo category" to "the foo category"
// Cleaning up SQL code since it is in backticks. Using template literals for variables in VALUES
const SQL = `
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS categories;

  CREATE TABLE categories(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE products(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    category_id UUID REFERENCES categories(id)
  );
  INSERT INTO categories(id, name) VALUES('${ids.foo_category}', 'the foo category');
  INSERT INTO categories(id, name) VALUES('${ids.bar_category}','bar category');

  INSERT INTO products(id, name, category_id) VALUES('${ids.foo_1}', 'foo1','${ids.foo_category}' );
  INSERT INTO products(id, name, category_id) VALUES('${ids.foo_2}','foo2', '${ids.foo_category}');
  INSERT INTO products(id, name, in_stock, category_id) VALUES('${ids.bar_1}', 'bar1', false, '${ids.bar_category}');
  `;

  /*create a method, sync, await client
  we're identifying the database, query the SQL
  --almost the same SQL we did in terminal , now we r doing it in node
  --this creates whatever tables you need to make*/
  const sync = async()=> {
    await client.query(SQL);
    console.log('success');
  };
  //method has a separate route from getAllProducts & tells client to query
  const findAllCategories = async()=> {
    const response = await client.query('SELECT * FROM categories');
    return response.rows;
  };
  //method has a separate route getAllCategories
  const findAllProducts = async()=> {
    const response = await client.query('SELECT * FROM products');
    return response.rows;
  };

  //going to use these in our server file
  module.exports = {
    sync,
    findAllProducts,
    findAllCategories
  };
