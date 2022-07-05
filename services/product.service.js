const faker=require('faker');
const boom = require('@hapi/boom');   //para usar nuestra libreria boom para manejar los status code de errores

class ProductsService{
  constructor(){
    this.products=[];    //creamos nuestro array en memoria
    this.generate();
  }

  generate(){
    const limit=100;
    for(let index=0;index<limit;index++){
        this.products.push({
          id:faker.datatype.uuid(),
          name:faker.commerce.productName(),
          price:parseInt(faker.commerce.price(),10),
          image:faker.image.imageUrl(),
          isBlock: faker.datatype.boolean(),   //variable para marcar productos bloqueados
        });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    })
  }

  async findOne(id) {
    //const name = this.getTotal();     //getTotal no existe, lo pusimos para crear un error y probar los middlewares
    const product = this.products.find(item => item.id === id);
    if( !product ){
      throw boom.notFound('Product not found com boom');  //implementamos el status code con boom, al decirle "notFound" el ya sabe que code de error debe lanzar
    }
    if (product.isBlock) {    //si efectivamente existe, validamos si esta o no bloqueado
      throw boom.conflict('product is block con Boom');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found Update con Boom');  //implementamos el status code con boom, al decirle "notFound" el ya sabe que code de error debe lanzar
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found Delete con Boom');   //implementamos el status code con boom, al decirle "notFound" el ya sabe que code de error debe lanzar
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
