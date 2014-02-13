'use strict';

var module = angular.module('sudokuJsApp');

module.controller('MainCtrl', function ($scope) {

  $scope.numbers = [1,2,3,4,5,6,7,8,9];

});


module.controller('NavController', function NavController($scope, $location) {

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

});
