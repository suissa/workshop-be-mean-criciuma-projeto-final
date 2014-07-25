'use strict';

// Helpers

var removeItem = function(arr, item){
  var index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

var cbFindSuccess = function (data, $scope) {
    $scope.breweries = data.data;
    $scope.message = 'List complete';
    console.log(data);
};
var cbFindError = function (error, $scope) {
    $scope.status = 'Unable to load beers: ' + error.message;
}

// Controllers 
angular.module('controllers.Breweries', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('RemoveBrewery', 
    ['$scope', '$http', 'BreweryService', 
    function ($scope, $http, BreweryService) {
      var Brewery = BreweryService;
      
      $scope.remove = function(brewery){
        console.log('Remove', breweries);
        if(confirm('Are you sure? Brewery '+brewery.name+' will be removed.')){
          Brewery.remove(brewery).
          success(function (data) {
            removeItem($scope.breweries, brewery);
          }).
          error(function (error) {
              $scope.status = 'Unable to load beers: ' + error.message;
          });

        }
    }
  }]).
  controller('BreweryListController', 
    ['$scope', '$http', 'BreweryService', 
    function ($scope, $http, BreweryService) {

      var Brewery = BreweryService;
      Brewery.find().then(function(breweries){
        console.log('Breweries: ', breweries);
        cbFindSuccess(breweries, $scope);
      }, function(err){
        cbFindError(err, $scope);
      });

      $scope.atualizarBeers = function(breweries){
        $scope.breweries = breweries;
        console.log('atualizarBeers breweries', $scope.breweries);
      }

  }]).
  controller('BeerCreateController', 
    ['$scope', '$http',
    function ($scope, $http) {

      var url = 'api/beers/';
      var method = 'POST';
      
      $scope.message = 'Crate Beer';

      $scope.create = function(beer){     
        $http({
          url: url,
          method: method,
          data: beer
        }).
        success(function(data){
          console.log(data);
          $scope.data = data;
          $scope.msg = 'Cerveja ' +beer.name+ ' cadastrada com sucesso'; 
        }).
        error(function(err){
          console.log(err);
          $scope.msg = 'Cerveja não pode ser cadastrada'; 
        });
      }    

  }]).
  controller('BeerShowController', 
    ['$scope', '$http', '$routeParams', '$location',
    function ($scope, $http, $routeParams, $location) {

      var id = $routeParams.id;
      var url = 'api/beers/_id/'+id;
      var method = 'GET';

      $scope.message = 'Show Beer';

      $http({
        url: url,
        method: method
      }).
      success(function(data){
        console.log('Beer: ', data);
        $scope.beer = data;
      }).
      error(function(err){
        console.log(err);
      });

      $scope.remove = function(beer){
        var id = beer._id;
        var url = 'api/beers/'+id;
        var method = 'DELETE';

        $http({
          url: url,
          method: method
        }).
        success(function(data){
          console.log(data);
          $scope.beer = data;
          $scope.message = 'Beer ' +beer.name+ 'removed successfully!';
          $location.path('/beers');
        }).
        error(function(err){
          console.log(err);
          $scope.message = 'Beer cant be removed!';
        });
      }

  }]).
  controller('BeerEditController', 
    ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

      var id = $routeParams.id;
      var url = 'api/beers/_id/'+id;
      var method = 'GET';

      $scope.message = 'Update Beer';
      // Pega os valores da cerveja a ser alterada
      $http({
        url: url,
        method: method
      }).
      success(function(data){
        console.log(data);
        $scope.beer = data;
      }).
      error(function(err){
        console.log(err);
      });

      $scope.update = function(beer){

        var method = 'PUT';

        $http({
          url: url,
          method: method,
          data: beer
        }).
        success(function(data){
          console.log(data);
          $scope.data = data;
          $scope.message = 'Beer ' +beer.name+ ' update successfully'; 
        }).
        error(function(err){
          console.log(err);
          $scope.msg = 'Beer cant be updated'; 
        });
      }
  }]).
  controller('BeerRemoveController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
    $scope.title = 'Workshop Be MEAN';

    var method = 'GET';
    var id = $routeParams.id;
    var url = '/api/beers/_id/'+id;
    $http({
      method: method,
      url: url
    })
    .success(function(data){
      $scope.beer = data;
      $scope.msg = 'About ' + $scope.beer.name;
    })
    .error(function(data){
      $scope.msg = 'Error in get beer';
    });

    $scope.remove = function(cerveja){
      var method = 'DELETE';
      var url = '/api/beers/_id/'+cerveja._id;
      console.log(url);
      if(confirm('Are you sure?')){
        $http({
          method: method,
          url: url
        })
        .success(function(data){
          $scope.msg = 'Beer ' +cerveja.name+ ' deleted successfully';
        })
        .error(function(data){
          $scope.msg = 'ERROR on DELETE';
        });

      }
    }

  }]);
