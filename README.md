
![Logo](https://i.imgur.com/nBea0Za.png)


    
# MySudoku

MySudoku it's a Sudoku generator to create multisize of Sudoku boards with built-in methods and properties to help you do many logical processes on the Sudoku board (See the Features section below for more details).

## Examples

```javascript
let mySudoku = new MySudoku(3);

console.log(mySudoku.board);

// [[7, 8, 2, 1, 9, 3, 6, 5, 4]
//  [3, 6, 1, 8, 4, 5, 2, 7, 9]
//  [5, 9, 4, 2, 6, 7, 1, 8, 3]
//  [2, 7, 3, 6, 5, 1, 9, 4, 8]
//  [6, 5, 8, 9, 2, 4, 3, 1, 7]
//  [1, 4, 9, 7, 3, 8, 5, 2, 6]
//  [9, 1, 6, 4, 8, 2, 7, 3, 5]
//  [4, 3, 7, 5, 1, 6, 8, 9, 2]
//  [8, 2, 5, 3, 7, 9, 4, 6, 1]]

```

## Usage

```javascript
In the process...

```

  
## Installation

Install MySudoku with cdn

```
url

```
    
## Features

### Properties

- `squareSize` Property - *Gets the size of the squares in the Sudoku Board.*
- `boardSize` Property - *Gets the size of the Sudoku board.*
- `blank` Property - *Gets the empty value of the fields.*
- `board` Property - *Gets the board as a 2D array.*
- `firstIdxs` Property - *Gets the first index in each square as a y-axis/x-axis point in the Sudoku Board in y-axis/x-axis.*
- `countGeneratedTimes` Property - *Gets the number of guesses to create the board.*

### Methods

- __fillBoard Method__
_The `fillBoard()` method creates an empty Sudoku board as a 2D array._
- __fillRow Method__
_The `fillRow()` method creates an empty row of the Sudoku board as an array._
- __fillSquares__ Method
_The `fillSquares()` method creates empty squares of the Sudoku board as a 2D array inside an Object. (if the size of the board is 9 x 9, then it will create three squares and so on)_
- __fillFirstIdxs__ method
_The `fillFirstIdxs()` method sets the first index in each square as a y-axis/x-axis point in the Sudoku Board in y-axis/x-axis._
- __countFilledFields__ Method
_The `countFilledFields()` method counts the number of filled fields in a row, column, and square (counting depends on a specific field point)._
- __checkNumInRow__ Method - *in the process...*
- __checkNumInSquares__ Method - *in the process...*
- __checkNumInCol__ Method - *in the process...*
- __possibleNums__ Method - *in the process...*
- __generateNumber__ Method - *in the process...*
- __printInRow__ Method - *in the process...*
- __printInSquares__ Method - *in the process...*
- __printInBoard__ Method - *in the process...*
- __Create Method__ - *in the process...*

  
## Demo

In Process...

  
## Authors

- [@maksenajeit33](https://github.com/maksenajeit33)

## Lessons Learned

In this project, I got good experience dealing with arrays and learned objects and classes in JavaScript, and also I raised my skills in optimizing my code and my logical processes.

  
## Tech Stack

**Client:** JavaScript, Object-oriented programming
  
## Feedback

If you have any feedback, please reach out to me at khaledjait11@gmail.com

  
## Related

Here are some related projects

[In process...](https://github.com/maksenajeit33)

  