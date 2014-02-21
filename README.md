# What is it?

This is a simple app I created because

 1.  I wanted to better learn how to write AngularJS apps, and 
 2.  I love Sudoku.  


# How the code works:

Page loads with a blank 9x9 grid

The numbers fill in one-at-a-time, but quickly. (for initial dev only)
Then numbers are removed based on the complexity level that is set

### Complexity levels:

(numbers are placeholder for now)

* Easy = 50 tiles showing
* Medium = 40 tiles showing
* Hard = 30 tiles showing
* Expert = 20 tiles showing

App keeps track of numbers that are still in play, and grays them out once all are placed.

Clicking a number highlights all placements of that number on the grid.

Clicking an empty square and then an option number places that number in the square.

Typing a number while an empty square is selected places that number in the square.

### App States

When an invalid number is placed in a square, the number will turn red, based on whether that number makes its' row, column, and/or subsquare invalid.

When all squares are correctly filled in, the board will turn green.

### TODO

* ~~Layout the game board~~
* ~~Flag invalid columns and rows~~
* Flag ALL invalid columns, rows, AND squares :)
* Create valid boards for solving (possibly using a Dancing Links algo)
