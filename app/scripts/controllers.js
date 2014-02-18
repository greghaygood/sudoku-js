'use strict';

var module = angular.module('sudokuJsApp');

module.controller('MainCtrl', function ($scope) {

  var numbers = $scope.numbers = [1,2,3,4,5,6,7,8,9];

  $scope.board = createMultiArray(numbers, numbers);
  $scope.message = "Ready ... Set ... Go!";
  $scope.boardIsValid = true;

  var isValidRowEntry = function(row, current_num) {
    // check if row m contains current_num
    var row_count = 0;
    for (var i = 0; i < numbers.length; i++) {
      var col_j = numbers[i];
      var entry = $scope.board[row][col_j];
      console.log('checking row:', i, col_j, entry );

      if (current_num == entry) { row_count++; }
    }
    console.log('processed rows, found ' + row_count + ' matches for ' + current_num);
    if (row_count > 1) { return false; }
    return true;
  };

  var isValidColumnEntry = function(col, current_num) {
  // check if column n contains current_num
    var col_count = 0;
    for (var j = 0; j < numbers.length; j++) {
      var row_i = numbers[j];
      var entry = $scope.board[row_i][col];
      console.log('checking col:', j, row_i, entry );

      if (current_num == entry) { col_count++; }
    }
    console.log('processed columns, found ' + col_count + ' matches for ' + current_num);
    if (col_count > 1) { return false; }
    return true;
  };

  var isValidSubSquareEntry = function(row, col, current_num) {

    // check if m-n square contains current_num
    var block_row = Math.ceil(row/3);
    var block_col = Math.ceil(col/3);
    console.log('checking square in quadrant: ', block_row, block_col);
    var square_count = 0;
    for (var i=1; i<=3; i++) { // sub-row
      for (var j=1; j<=3; j++) { // sub-col
        var row_i = 3*(block_row-1) + i;
        var col_j = 3*(block_col-1) + j;
        var entry = $scope.board[row_i][col_j];
        console.log('checking square item: ', row_i, col_j, entry);
        if (current_num == entry) { square_count++; }
      }
    }
    console.log('processed the square, found ' + square_count + ' matches for ' + current_num);
    if (square_count > 1) { return false; }
    return true;
  };

  var isValidEntry = function(row, col) {

    var current_num = $scope.board[row][col];
    if (!current_num) { return true; } // means the user deleted an entry
    if (isNaN(current_num) || current_num < 1 || current_num > 9) { return false; }

    console.log('checking if ' + current_num + ' is a valid entry ...', row, col);

    if (! isValidRowEntry(row, current_num) ) { return false; }
    if (! isValidColumnEntry(col, current_num) ) { return false; }
    if (! isValidSubSquareEntry(row, col, current_num) ) { return false; }

    return true;
  };

  var isValidBoard = function() {

    // NOTE:  This is a very naive implementation!  I'll figure out how to
    // incorporate the Dancing Links algorithm later:
    // http://en.wikipedia.org/wiki/Dancing_Links

    var result = true;

    for (var i = 0; i < numbers.length; i++) {
      var row_i = numbers[i];
      for (var j = 0; j < numbers.length; j++ ) {
        var col_j = numbers[j];

        var current_num = $scope.board[row_i][col_j];
        if (!current_num) { continue; } // empty entry is valid

        if (! isValidRowEntry(row_i, current_num) ) { return false; }
        if (! isValidColumnEntry(col_j, current_num) ) { return false; }
        if (! isValidSubSquareEntry(row_i, col_j, current_num) ) { return false; }

        return true;
      }
    };
  };

  $scope.updateBoard = function(m, n) {
    console.log('updating board ...', $scope.board, m, n);

    // TODO: duplicative check, or is it on-average faster to fail on immediate errors?
    if (isValidEntry(m, n) && isValidBoard()) {
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
