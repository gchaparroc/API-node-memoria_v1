const boom = require('@hapi/boom');  //importamos Boom

//middleware que es de tipo normal, no de tipo error como los anteriores
//esta sera una funcion que crea middlewares de forma dinamica que servira para todos mis schemas (usando propiedad closures de javascript)
function validatorHandler(schema, property) {
  return (req, res, next) => {
    //req.body   => la informacion que viene de un POST
    //req.params   => la informacion que viene de un GET
    //req.query   => la informacion que viene de un GET
    //En este caso viene de todas estas fuentes dentro de la property (dinamico)
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });  // con { abortEarly: false } joi va a notificar todos los errores de una vez en el request, no uno por uno como lo hace por defecto
    if (error) {  //validamos si hay algun error
      next(boom.badRequest(error));   //si si hay error, lo retornamos con Boom de tipo 400 (algo no esta bien en el request)
    }
    next();  //se ejecuta si no hay ningun error y seguimos con la ejecucion normal
  }
}

module.exports = validatorHandler;
