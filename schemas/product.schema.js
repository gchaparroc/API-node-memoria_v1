//estos son los mismo DTO del curso de Nest JS
const Joi = require('joi');  //importamos joi, libreria para validacion de schemas

const id = Joi.string().uuid();      //validamos el id
//const name = Joi.string().alphanum().min(3).max(15);   //validamos en name (con alphanum() da error ya que este acepta letras y numeros pero sin espacios)
const name = Joi.string().min(3).max(15);   //validamos en name
const price = Joi.number().integer().min(10);  //validamos el price
const image = Joi.string().uri();   //validamos la URL

const createProductSchema = Joi.object({     //schema para la creacion
  name: name.required(),
  price: price.required(),
  image: image,                   //no es obligatorio
});

const updateProductSchema = Joi.object({   //schema para la actualizacion
  name: name,
  price: price,
  image: image,
});

const getProductSchema = Joi.object({     //schema para un Get de un id
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }   //importamos nuestros schemas

/*¿Como implementamos la validacion de estos schemas?
  RTA: Vamos a crear nuestro middleware al cual podamos enviarle nuestro schema y luego con la API
       de joi saber si los datos que nos estan enviando cumplen con las validaciones y las reglas
       que acabamos de establecer*/
