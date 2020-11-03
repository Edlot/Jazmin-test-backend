const express = require("express")
const app = express();
const cors = require('cors');

app.use(cors());

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(require("./Controllers/Clientes"));
app.use(require("./Controllers/Empleados"));
app.use(require("./Controllers/Facturas"));
app.use(require("./Controllers/Productos_factura"));
app.use(require("./Controllers/Productos"));
app.use(require("./Controllers/Security"));

app.get('/',(req, res) => {
  res.status(200).send('index');
})

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

