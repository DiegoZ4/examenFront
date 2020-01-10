'use strict'

var fs = require('fs');
var content = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

var mongoose = require('mongoose');
var app = require('./app');

console.log(process.env.NODE_ENV);

var NODE_ENV = process.env.NODE_ENV || 'development';

console.log(NODE_ENV);

require('dotenv').config({
  path: `.env.${NODE_ENV}`
});

console.log(process.env.ENV);

var port = process.env.PORT;
var db = process.env.DB;


var Hotel =  require('./models/hotel');

mongoose.connect('mongodb://localhost:27017/'+db, { useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
  if(err){
    throw err;
  }else{
    console.log('Conexión a la base de datos '+db+'...... Ok');

    mongoose.connection.db.listCollections({name: 'hotels'})
    .next(function(err, collinfo) {
        if (collinfo) {
            // The collection exists
            console.log("La coleccion existe");
        }else{
          console.log("No existe la coleccion");

          var hotel = new Hotel();

          console.log(typeof content);
          // console.log(content);

          Hotel.insertMany(content, (err, hotelStored ) => {

              if(err){
                console.log('Hay un error...... '+err);
              }else{
                if(!hotelStored){
                  console.log('No Se puede agregar el hotel...... ' + hotel.name );
                }else{
                  console.log('Hotel agregado con exito...... '+hotelStored);
                }
              }
          })

          
        }
    });

    app.listen(port, function(){
      console.log('Servidor de Api REST...... Ok | Escuchando en: http://localhost:'+port);
    })
  }
})
