'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Hotel =  require('../models/hotel');

function pruebas (req, res) {
  res.status(200).send({
    message: 'Probando una accion del controlador de hoteles'
  })
}

function saveHotel (req, res) {
  var hotel = new Hotel();
  var params = req.body;


  hotel.name = params.name;
  hotel.stars = params.stars;
  hotel.price = params.price;
  hotel.image = 'null';
  hotel.amentities = params.amentities;


  if(hotel.name != null)  {
    hotel.save( (err, hotelStored ) => {

      if(err){
        res.status(200).send({  message: 'Hay error' });
      }else{
        if(!hotelStored){
          res.status(404).send({  message: 'NOO Se puede grabar' });
        }else{
          res.status(200).send({  hotel: hotelStored });
        }
      }
    })
  }else{
    res.status(200).send({ message: 'Debes ingresar todos los campos requeridos' });
  }

}

function getHotel(req, res) {

  var hotelId = req.params.id;

  Hotel.findById(hotelId, (err, hotel) => {
      if(err){
          res.status(500).send({message: "Ha ocurrido un error"});
      }else{
        if(!hotel) {
          res.status(404).send({message: "No se encontró el Hotel"});
        }else{
          res.status(200).send({ hotel });
        }
      }
  });

}

function getHoteles(req, res) {

  if(req.params.page) {
    var page = req.params.page;
  }else{
    var page = 1;
  }

  var itemsPerPage = 5;

  Hotel.find().sort('name').paginate(page, itemsPerPage, (err,hoteles,total) => {
    if(err) {
      res.status(500).send({message: "Ha ocurrido un error"});
    }else {
      if(!hoteles) {
        res.status(404).send({message: "No se encontraron el Hoteles"});
      }else{
        return res.status(200).send({
          total_items:total,
          hoteles:hoteles
        });
      }
    }
  });

}

function getHotelesByStars(req, res) {

  if(req.params.page) {
    var page = req.params.page;
  }else{
    var page = 1;
  }

  var itemsPerPage = 5;
  var stars = req.params.stars;

  Hotel.find({
    stars: stars
  }).sort('stars').paginate(page, itemsPerPage, (err,hoteles,total) => {
    if(err) {
      res.status(500).send({message: "Ha ocurrido un error"});
    }else {
      if(!hoteles) {
        res.status(404).send({message: "No se encontraron el Hoteles"});
      }else{
        return res.status(200).send({
          total_items:total,
          hoteles:hoteles
        });
      }
    }
  });

}

function searchHoteles(req, res) {

  if(req.params.page) {
    var page = req.params.page;
  }else{
    var page = 1;
  }

  var keyToSearch = req.params.text;

  var itemsPerPage = 5;


  Hotel.find({
    name: {
      $regex: new RegExp(keyToSearch)
    }
  }, {
    __v:0
  }).paginate(page, itemsPerPage, (err,hoteles,total) => {
  // Hotel.find().sort('name').paginate(page, itemsPerPage, (err,hoteles,total) => {
    if(err) {
      console.log(err);
      res.status(500).send({message: "Ha ocurrido un error"});
    }else {
      if(!hoteles) {
        res.status(404).send({message: "No se encontraron el Hoteles"});
      }else{
        return res.status(200).send({
          total_items:total,
          hoteles:hoteles
        });
      }
    }

  // console.log(hotelSearch);
  // res.hotelSearch;
  })
}

function updateHotel(req, res) {
  var hotelId = req.params.id;
  var update = req.body;

  Hotel.findByIdAndUpdate(hotelId, update, (err, hotelUpdated) => {
    if(err) {
      res.status(500).send({message: "Ha ocurrido un error al actualizar"});
    }else {
      if(!hotelUpdated) {
        res.status(404).send({message: "El hotel no ha sido actualizado"});
      }else{
        return res.status(200).send({
          hotel_actualizado:hotelUpdated
        });
      }
    }
  })
}


function deleteHotel(req, res) {
  var hotelId = req.params.id;

  Hotel.findByIdAndRemove(hotelId, (err, hotelDeleted) => {
    if(err) {
      res.status(500).send({message: "Ha ocurrido un error"});
    }else {
      if(!hotelDeleted) {
        res.status(404).send({message: "El hotel no ha sido eliminado"});
      }else{
        return res.status(200).send({
          hotel_eliminado:hotelDeleted
        });
      }
    }
  })
}

function uploadImage(req, res) {
  var hotelId = req.params.id;
  var file_name = 'No subido ...';

  if(req.files) {
    console.log(req.files.image.path);
    console.log(req.files);
    var file_path = req.files.image.path;
    console.log(file_path);
    var file_split = file_path.split('\/');
    console.log(file_split);
    var file_name = file_split[1];
    console.log(file_name);

    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if(file_ext == "png" || file_ext == "gif" || file_ext == "jpg") {
      Hotel.findByIdAndUpdate(hotelId, {image:file_name}, (err,hotelUpdated) => {
        if(!hotelUpdated){
          res.status(404).send({message: "El hotel no ha sido actualizado"});
        }else{
          return res.status(200).send({
            hotel_actualizado:hotelUpdated
          });
        }
      })
    }else{
      res.status(200).send({message: "Extensión de imagen no valida"});
    }
  }else{
    res.status(404).send({message: "No has subido ninguna imagen"});
  }

}

function getImageFile (req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './uploads/'+imageFile;

  console.log(imageFile);
  console.log(path_file);

  fs.exists(path_file, function(exists){
    console.log(exists);
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: "La imagen solicitada no existe"});
    }
  })
}

module.exports = {
  pruebas,
  saveHotel,
  getHotel,
  getHoteles,
  updateHotel,
  deleteHotel,
  uploadImage,
  getImageFile,
  searchHoteles,
  getHotelesByStars
}
