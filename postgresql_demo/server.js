const express = require('express');
const app = express();
const db = require('./db');


/*this gives us the ability to return a react page as our main page and then end
 up using axios to hit these routes to display data about our products and our
 categories*/
app.get('/api/products', async(req, res, next)=> {
  try {
    res.send(await db.findAllProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/categories', async(req, res, next)=> {
  try {
    res.send(await db.findAllCategories());
  }
  catch(ex){
    next(ex);
  }
});

db.sync()
  .then(()=> app.listen(3000));
