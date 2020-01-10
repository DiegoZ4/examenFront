'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var hotel_routes = require('./routes/hoteles')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Configurar headers
app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.header('Allow', 'GET, POST, DELETE, PUT, OPTIONS');

  next();
})

// Rutas basicas
app.use('/api', hotel_routes);

// app.get('/pruebas', function(req, res){
//   res.status(200).send({message:'Pagina de pruebas'})
// });


module.exports = app;
