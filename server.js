const express = require("express");
const cors = require("cors");

const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://backofficeag.herokuapp.com"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "bienvenido al backend del backoffice de ag" });
});
db.sequelize.sync();
require("./app/routes/categorias.routes")(app);
require("./app/routes/productos.routes")(app);
require("./app/routes/usuarios.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


