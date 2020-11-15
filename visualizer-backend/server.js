const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions)); //COARS

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
app.use('/audios',express.static(__basedir+"/resources/static/assets/uploads/")) //static files serve
initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});