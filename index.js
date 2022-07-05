const express = require('express');
const cors = require('cors');          //importamos cors y guardamos en variable
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');  //importamos nuestros middlewares de errores

const app = express();
//app.use(cors());   //usamos libreria que descargamos de CORS (middleware), si lo dejamos asi lo que vamos a hacer es dejarlo abierto habilitando a cualquier dominio para que se conecte a nuestro backend (API Publica)

//const port = 3000;         //este es el puesto 3000 donde corre mi app
const port = process.env.PORT || 3000;   //para que heroku pueda inyectar la variable del puerto (dinamico), de lo contrario lo corremos en el puerto por defecto es decir en el 3000

app.use(express.json());      //implementacion middleware

const whitelist = ['http://localhost:8080', 'https://myapp.co'];  //lista origenes o dominios a los cuales les voy a permitir conectarse a nuestra API
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {  //Con libreria de CORS preguntamos si el ogigen se encuentra dentro del array "whiteList"
      callback(null, true);   //Si si esta le permitimos pasar
    } else {
      callback(new Error('no permitido'));   //si no esta, se le da error de CORS (no permite)
    }
  }
}
app.use(cors(options));

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
