const cors = require("cors");
const express = require("express");
const path = require('path');
const app = express();

global.__basedir = __dirname;
global.__website = "https://audio-visualize.herokuapp.com" //change to localhost:5000 for "heroku local web"

var corsOptions = {
  origin: __website
};

app.use(cors(corsOptions)); //COARS

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
app.use('/audios',express.static(__basedir+"/resources/static/assets/uploads/")) //static files serve
app.use(express.static(__basedir));

initRoutes(app);

app.get('/*', function(req,res) {
  res.sendFile(path.join(__basedir+'/dist/visualizer/index.html'));
});


app.listen(process.env.PORT || 5000);
