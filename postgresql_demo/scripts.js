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
--a1eb855a-1dd3-4aec-9dd7-aff78be20d0e
--fe5a1929-78f2-4c94-a78c-d548952981ea
--54f43c6b-56a1-4a58-92fb-7a8147ad8eef
INSERT INTO categories(id, name) VALUES('a1eb855a-1dd3-4aec-9dd7-aff78be20d0e', 'foo category');
INSERT INTO categories(id, name) VALUES('fe5a1929-78f2-4c94-a78c-d548952981ea','bar category');

--e4d3fdab-00ca-4c1e-abd2-a24cbbe01a66
--985b402f-b6a3-4f0a-8bb9-860662620415
--ebaae031-4147-4189-b3a8-de344e528231
INSERT INTO products(id, name, category_id) VALUES('e4d3fdab-00ca-4c1e-abd2-a24cbbe01a66', 'foo1','a1eb855a-1dd3-4aec-9dd7-aff78be20d0e' );
INSERT INTO products(id, name, category_id) VALUES('985b402f-b6a3-4f0a-8bb9-860662620415','foo2', 'a1eb855a-1dd3-4aec-9dd7-aff78be20d0e');
INSERT INTO products(id, name, in_stock, category_id) VALUES('ebaae031-4147-4189-b3a8-de344e528231', 'bar1', false, 'fe5a1929-78f2-4c94-a78c-d548952981ea');

SELECT products.name as product_name, categories.name as category_name
FROM products
JOIN categories
On products.category_id = categories.id

