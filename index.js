const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());      //implementacion middleware
app.use(cors());              //usamos libreria que descargamos de CORS (middleware)

app.get('/', (req, res) => {
  res.send("Hola mi server en Express");
});

routerApi(app);

app.listen(port, () => {
  console.log('Mi port' +  port);
});
