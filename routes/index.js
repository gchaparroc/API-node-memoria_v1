const express = require('express');

const productsRouter = require('./products.router');
// const usersRouter = require('./users.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);      //path global o general para poder manejar versiones
  router.use('/products', productsRouter);
  //router.use('/users', usersRouter);
  //router.use('/categories', productsRouter);
}

module.exports = routerApi;
