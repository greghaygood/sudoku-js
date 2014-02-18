'use strict';

var module = angular.module('sudokuJsApp');

module.controller('MainCtrl', function ($scope) {

  var numbers = $scope.numbers = [1,2,3,4,5,6,7,8,9];

  $scope.board = createMultiArray(numbers, numbers);
  $scope.message = "Ready ... Set ... Go!";
  $scope.boardIsValid = true;

  var isValidEntry = function(m, n) {

    var current_num = $scope.board[m][n];
    if (!current_num) { return true; } // means the user deleted an entry
    if (isNaN(current_num) || current_num < 1 || current_num > 9) { return false; }

    console.log('checking if ' + current_num + ' is a valid entry ...', m, n);

    // NOTE:  This is a very naive implementation!  I'll figure out how to
    // incorporate the Dancing Links algorithm later:
    // http://en.wikipedia.org/wiki/Dancing_Links

    // check if row m contains current_num
    var row_count = 0;
    for (var i = 0; i < numbers.length; i++) {
      var m_i = numbers[i];
      var item_m_i = $scope.board[m][m_i];
      console.log('checking row:', i, m_i, item_m_i );

      if (current_num == item_m_i) { row_count++; }
    }
    console.log('processed rows, found ' + row_count + ' matches for ' + current_num);
    if (row_count > 1) { return false; }

    // check if column n contains current_num
    var col_count = 0;
    for (var i = 0; i < numbers.length; i++) {
      var n_i = numbers[i];
      var item_n_i = $scope.board[n_i][n];
      console.log('checking col:', i, n_i, item_n_i );

      if (current_num == item_n_i) { col_count++; }
    }
    console.log('processed columns, found ' + col_count + ' matches for ' + current_num);
    if (col_count > 1) { return false; }

    // check if m-n square contains current_num
    var block_row = Math.ceil(m/3);
    var block_col = Math.ceil(n/3);
    console.log('checking square in quadrant: ', block_row, block_col);
    var square_count = 0;
    // [m+(i-1)*3] x [n+(j-1)*3]
    for (var i=1; i<=3; i++) { // sub-row
      for (var j=1; j<=3; j++) { // sub-col
        var m_i = 3*(block_row-1) + i;
        var n_j = 3*(block_col-1) + j;
        var item_m_n = $scope.board[m_i][n_j];
        console.log('checking square item: ', m_i, n_j, item_m_n);
        if (current_num == item_m_n) { square_count++; }
      }
    }
    console.log('processed the square, found ' + square_count + ' matches for ' + current_num);
    if (square_count > 1) { return false; }


    return true;
  };

  $scope.updateBoard = function(m, n) {
    console.log('updating board ...', $scope.board, m, n);

    if (isValidEntry(m, n)) {
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
