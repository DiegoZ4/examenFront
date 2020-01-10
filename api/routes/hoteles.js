'use strict'

var express = require('express');
var HotelController = require('../controllers/hotel');

var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads'});

api.get('/hotel/:id', HotelController.getHotel);
api.get('/hoteles/:page?', HotelController.getHoteles);
api.get('/hoteles-search/:text/:page?', HotelController.searchHoteles);
api.get('/hoteles-stars/:stars/:page?', HotelController.getHotelesByStars);
api.post('/hotel', HotelController.saveHotel);
api.put('/hotel/:id', HotelController.updateHotel);
api.delete('/hotel/:id', HotelController.deleteHotel);
api.post('/upload-image-hotel/:id', md_upload, HotelController.uploadImage );
api.get('/get-image-hotel/:imageFile', HotelController.getImageFile);

module.exports = api;
