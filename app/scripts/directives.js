'use strict';

var module = angular.module('sudokuJsApp.directives', []);

module.directive('plotIcon', function() {

  console.log("plot-icon directive ...");

  var addIcon = function(scope, element, attrs) {
    console.log('adding plot icon', scope, element, attrs);

      var icon = 'fa-signal'; // default is aggregate
      if (attrs['operation'] && attrs['operation'] == 'mean') {
        icon = 'fa-bar-chart-o';
      }
      element.addClass(icon);
    }

    return {
      restrict: 'C',
      link: addIcon
    };

  });


module.directive('gameBoard', function() {

  console.log("game-board directive ...");

  var fillInBoard = function() {
    console.log("filling in game board ...");

    angular.forEach$('game-board input')
  };

  var setupGameBoard = function(scope, element, attrs) {
    console.log('setting up game board', scope, element, attrs);

    fillInBoard();
  };

  return {
    restrict: 'E',
    replace: false,
    link: setupGameBoard
  };

});

module.directive('numberList', function() {

  console.log("number-list directive ...");

  var renderList = function(scope, element, attrs, ctrl) {

    console.log('setting up number-list', scope, element, attrs, ctrl);

  };

  var ctrl = function($scope) {
    $scope.selected = 0;

    $scope.pick = function(number) {
      console.log('number selected!', number);
      angular.forEach($scope.numbers, function(n) {
        n.selected = false;
      });
      number.selected = true;
      $scope.selected = number;
    };
  };

  return {
    restrict: 'A',
    replace: false,
    link: renderList,
    controller: ctrl
  };

});

