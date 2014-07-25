var express = require('express');
var router = express.Router();

var Beer = require('../controllers/api/beers'); 

var cb = function(err, data, res, url){
  res.render(dir + '/' + name + '-preload', {beers: data});
}

router.get('/:dir/:name', function(req, res) {
  var dir = req.params.dir;
  var name = req.params.name;
  res.render(dir + '/' + name);
});

router.get('/:dir/:name/preload', function(req, res) {
  var dir = req.params.dir;
  var name = req.params.name;
  var url = dir+'/'+name;
  // pegar data e passar na rota
  Beer.retrieve(req, res, cb, url);
});


module.exports = router;