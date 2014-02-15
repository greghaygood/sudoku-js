'use strict';

var module = angular.module('sudokuJsApp');

module.controller('MainCtrl', function ($scope) {

  var numbers = $scope.numbers = [1,2,3,4,5,6,7,8,9];

  $scope.board = createMultiArray(numbers, numbers);
  $scope.message = "Ready ... Set ... Go!";
  $scope.boardIsValid = true;

  var isValidBoard = function() {

    // NOTE:  This is a very naive implementation!  I'll figure out how to
    // incorporate the Dancing Links algorithm later:
    // http://en.wikipedia.org/wiki/Dancing_Links

    for (var i = 0; i < numbers.length; i++) {
      var m_i = numbers[i];
      var row_i = $scope.board[i];
      console.log('row', i, m_i, row_i);

        // check if row i contains current_num
        var row_matches = _.groupBy(row_i, function(num) { return num; });
        console.log("row_matches", row_i, row_matches);
        var badRow = _.find(row_matches, function(items, key) { console.log('checking for bad row', key, items); return items[0] != "" && items.length > 1; });
        console.log('bad row? ', badRow);
        if (badRow) { return false; }

      for (var j = 0; j < numbers.length; j++) {
        var n_j = numbers[j];

        var current_num = $scope.board[m_i][n_j];


        // check if column j contains current_num

        if ($scope.board[m_i][n_j] == 3) {
          return false;
        }
      };
    }

    return true;
  };

  $scope.updateBoard = function() {
    console.log('updating board ...', $scope.board);

    if (isValidBoard()) {
      $scope.message = "Board is good!";
      $scope.boardIsValid = true;
    } else {
      $scope.message = "Error on board!";
      $scope.boardIsValid = false;

    }
  };

});


module.controller('NavController', function NavController($scope, $location) {

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

});

function createMultiArray(m, n) {
    var arr = [];

    for (var i = 0; i < m.length; i++) {
      var m_i = m[i];
      arr[m_i] = [];
      for (var j = 0; j < n.length; j++) {
        var n_j = n[j];
        arr[m_i][n_j] = '';
      };
    }

    return arr;
}
