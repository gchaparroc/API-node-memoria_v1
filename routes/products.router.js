const express = require('express');
const faker = require('faker');

const router = express.Router();

//http://localhost:3000/products
router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;    //http://localhost:3000/products?size=2
  const limit = size || 10;   //query params, si viene lo asigna, si no nos dara un limit por default de 10
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

//Ponerlo antes que el de '/products/:id' para que no choquen
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 2000
  });
});

module.exports = router;








