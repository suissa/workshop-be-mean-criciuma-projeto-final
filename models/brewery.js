var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrewerySchema = new Schema({
  id: { type: Number, min: 0},
  name: { type: String, default: '' }
});

module.exports = mongoose.model('Brewery', BrewerySchema);


