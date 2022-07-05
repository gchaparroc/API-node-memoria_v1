const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');  //importamos nuestros middlewares de errores

const app = express();
app.use(cors());              //usamos libreria que descargamos de CORS (middleware)

const port = 3000;         //este es el puesto 3000 donde corre mi app

app.use(express.json());      //implementacion middleware

app.get('/', (req, res) => {
  res.send("Hola mi server en Express");
});

routerApi(app);

//OJO lod middlewares siempre debemos implementarlos despues del router
//el comportamiento sera en orden secuencial, es decir, el orden en que lo pongamos asi se ejecutaran
/*es importante porque "errorHandler" o ejecuta "Next" por lo tanto si lo ponemos de primero va a parar
  toda la ejecucion y nunca se va a ejecutar en otro middleware que hicimos llamado "logErrors"*/
app.use(logErrors);
app.use(boomErrorHandler);    //este es nuestro middleware para manejar errores con Boom
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port' +  port);
});
