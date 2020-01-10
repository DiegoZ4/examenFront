'use strict'

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var HotelSchema = Schema({
  name:    { type: String, index:true },
  stars:  { type: Number },
  price:   { type: String },
  image:  { type: String },
  amenities: { type: Array}
});

module.exports = mongoose.model('Hotel', HotelSchema); 
