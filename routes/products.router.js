const express = require('express');

const ProductsService = require('./../services/product.service');

const router = express.Router();
const service = new ProductsService();   //instancia de nuestro servicio

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', async (req, res, next) => {    //implementamos "next" para usar nuestros middlewares
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);       //capturamos nuestro error y lo enviamos a los middlewares
  }

});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    /*
    res.status(404).json({
      message: error.message
    });
    */
    next(error);       //capturamos nuestro error y lo enviamos a los middlewares
  }

});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);       //capturamos nuestro error y lo enviamos a los middlewares
  }

});

module.exports = router;

