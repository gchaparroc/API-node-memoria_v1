//middleware de errores para monitorearlos por consola
function logErrors (err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}

//middleware de errores para devolver mensaje del error al cliente en formato json
function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

//middleware para manejar errores con Boom
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {              //si la propiedad "isBoom" existe, entonces sabemos que es un error de Boom
    const { output } = err;      //en el "output" Boom tiene toda la informacion del error
    res.status(output.statusCode).json(output.payload);  //aca el status es dinamico manejado por Boom
  }
  next(err);   //se ejecuta si el error no es de tipo Boom y ahi ya ejecutaria otro middleware distinto
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
