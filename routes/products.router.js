const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');  //importamos archivo para validar nuestro schemas
const {
        createProductSchema,
        updateProductSchema,
        getProductSchema
      } = require('./../schemas/product.schema');  //importamos nuestros schemas

const router = express.Router();
const service = new ProductsService();   //instancia de nuestro servicio

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),  //enviamos a nuestro middleware (middleware 1) dinamico los datos necesarios, el schema (schema) y la fuente de datos del request (property)
  async (req, res, next) => {    //implementamos "next" para usar nuestros middlewares  (recordar que este es nuestro middleware 2)
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);       //capturamos nuestro error y lo enviamos a los middlewares
    }

  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),  //(middleware 1) para validacion de nuestro schema
  async (req, res) => {   //nuestro middleware 2
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
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

