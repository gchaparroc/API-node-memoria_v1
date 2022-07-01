const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();
app.use(cors());              //usamos libreria que descargamos de CORS (middleware)

const port = 3000;         //este es el puesto 3000 donde corre mi app

app.use(express.json());      //implementacion middleware

app.get('/', (req, res) => {
  res.send("Hola mi server en Express");
});

routerApi(app);

app.listen(port, () => {
  console.log('Mi port' +  port);
});
