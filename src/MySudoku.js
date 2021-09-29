class MySudoku {
  constructor(type, blank = 0) {
    // :: Defining the size of the board and the squares in the board
    this.squareSize = type;
    this.boardSize = type * type;

    this.blank = blank; // : The empty field value :

    this.boardRowPoint = 0; // : x-axis in the `row` :
    this.boardColPoint = 0; // : y-axis in the `board` :
    this.squareColPoint = 0; // : y-axis in the each square in the `squares` :

    // :: Defining the `board`, `row`, and `squares` arrays
    this.board = new Array();
    this.row = new Array();
    this.squares = new Object();

    // :: This object to check if the field is checked (if there is any possible number can put in) or not
    this.fieldChecked = new Object();

    // :: Defining the first index of each square by x-axis/y-axis
    this.firstIdxs = new Array();

    this.countGeneratedTimes = 0; // : The number of times a number has been generated for the `board` :
    this.countRowFilledTimes = 0; // : The number of times a number has been generated for each `row` :

    this.fillBoard();
    this.fillRow();
    this.fillSquares();
    this.fillFirstIdxs();
    this.fillFieldChecked();
    this.create();
  }

  // :: Filling the `board` with 0 value
  fillBoard = function () {
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = new Array();
      for (let j = 0; j < this.boardSize; j++) this.board[i][j] = this.blank;
    }
  };

  // :: Filling the `row` with 0 value
  fillRow = function () {
    for (let i = 0; i < this.boardSize; i++) this.row[i] = this.blank;
  };

  // :: Filling the `squares` with 0 value
  fillSquares = function () {
    for (let i = 0; i < this.squareSize; i++) {
      this.squares[i] = new Array();
      for (let j = 0; j < this.squareSize; j++) {
        this.squares[i][j] = new Array();
        for (let n = 0; n < this.squareSize; n++) {
          this.squares[i][j][n] = this.blank;
        }
      }
    }
  };

  // :: Filling the `firstIdxs` with the first index of each square
  fillFirstIdxs = function () {
    for (let i = 0, idx = 0; i < this.squareSize; i++) {
      this.firstIdxs[i] = idx;
      idx += this.squareSize;
    }
  };

  // :: Filling the `fieldChecked` with false value
  fillFieldChecked = function () {
    for (let i = 0; i < this.boardSize; i++) this.fieldChecked[i] = false;
  };

  // :: Counting how many fields are filled in the row, column and square
  countFilledFields = function (
    yCol = this.boardColPoint,
    ySquare = this.squareColPoint,
    xRow = this.boardRowPoint
  ) {
    let start = 0,
      end = this.squareSize,
      numsColFilled = 0,
      numsSquareFilled = 0,
      countNumsSquareFilled = 0;
    // : Counting filled fields in the column :
    for (let i = 0; i < this.squareSize; i++) {
      if (yCol >= start && yCol < end) {
        numsColFilled = this.firstIdxs[i];
        break;
      }
      start += this.squareSize;
      end += this.squareSize;
    }

    // : Counting filled fields in the square :
    for (let i = 0; i < this.squareSize; i++) {
      if (ySquare == i) {
        numsSquareFilled = countNumsSquareFilled;
        break;
      }
      countNumsSquareFilled += this.squareSize;
    }
    // : Return the sum :
    return xRow + numsColFilled + numsSquareFilled;
  };

  // :: Checking if the passed number is exists in the row or not
  checkNumInRow = (num) => (this.row.indexOf(num) == -1 ? false : true);

  // :: Checking if the passed number is exists in the square or not
  checkNumInSquares = function (num) {
    let start = 0,
      end = this.squareSize;
    for (let i = 0; i < this.squareSize; i++) {
      if (this.boardRowPoint >= start && this.boardRowPoint < end) {
        for (let j = 0; j < this.squareSize; j++) {
          if (this.squares[i][j].indexOf(num) != -1) return true;
        }
        break;
      }
      start += this.squareSize;
      end += this.squareSize;
    }
    return false;
  };

  // :: Checking if the passed number is exists in the column or not
  checkNumInCol = function (num) {
    for (let i = 0; i < this.boardSize; i++) {
      if (this.board[i][this.boardRowPoint] == num) return true;
    }
    return false;
  };

  // :: Reset all squares
  bigReset = function () {
    let start = 0,
      end = this.squareSize,
      idxInFirstIdxs;
    // : Find the first index in a square (current in the process) :
    for (let i = 0; i < this.squareSize; i++) {
      if (this.boardColPoint >= start && this.boardColPoint < end) {
        idxInFirstIdxs = i;
        break;
      }
      start += this.squareSize;
      end += this.squareSize;
    }

    // : Reset the y-axis of the board to the first index in a square :
    // : Reset all the squares in the `board` for one group :
    let firstIdxs1 = this.firstIdxs.slice(0);
    this.boardColPoint = firstIdxs1[idxInFirstIdxs];
    for (let i = 0; i < this.squareSize; i++) {
      this.board[firstIdxs1[idxInFirstIdxs]++].fill(this.blank, 0);
    }

    // : Reset all the `squares` :
    for (let i = 0; i < this.squareSize; i++) {
      for (let j = 0; j < this.squareSize; j++)
        this.squares[i][j].fill(this.blank, 0);
    }
    this.squareColPoint = 0;
    this.countRowFilledTimes = 0;

    // : Reset the `row` and the `fieldChecked`:
    this.row.fill(this.blank, 0);
    this.boardRowPoint = 0;
    for (let i in this.fieldChecked) this.fieldChecked[i] = false;
  };

  // :: Checking whether there are any numbers that can be placed in a field
  possibleNums = function () {
    let oneToRowEnd = new Array();
    for (let i = 0; i < this.boardSize; i++) oneToRowEnd[i] = i + 1;

    // : Check column :
    for (let i = 0; i < oneToRowEnd.length; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (oneToRowEnd[i] == this.board[j][this.boardRowPoint])
          oneToRowEnd.splice(i--, 1);
      }
    }

    // : Check square :
    let start = 0,
      end = this.squareSize;
    for (let i = 0; i < this.squareSize; i++) {
      if (this.boardRowPoint >= start && this.boardRowPoint < end) {
        for (let j = 0; j < this.squareSize; j++) {
          for (let n = 0; n < oneToRowEnd.length; n++) {
            if (this.squares[i][j].indexOf(oneToRowEnd[n]) != -1)
              oneToRowEnd.splice(n--, 1);
          }
        }
        break;
      }
      start += this.squareSize;
      end += this.squareSize;
    }

    // : If all numbers are used in the column and the square, it means that there is no possible number that can placed in :
    if (!oneToRowEnd.length) return this.bigReset();

    // : Check row :
    for (let i = 0; i < oneToRowEnd.length; i++) {
      if (this.row.indexOf(oneToRowEnd[i]) != -1) oneToRowEnd.splice(i--, 1);
    }

    // : Reset fields if all numbers are used in all of row, column, and square :
    if (!oneToRowEnd.length) {
      // : if the row was reset it ten times, then reset all squares instead of :
      if (this.countRowFilledTimes > this.boardSize * this.boardSize)
        return this.bigReset();

      // : Reset the row :
      this.row.fill(this.blank, 0);
      this.boardRowPoint = 0;
      this.countRowFilledTimes++;

      // : Reset the fieldChecked :
      for (let i in this.fieldChecked) this.fieldChecked[i] = false;
    } else this.fieldChecked[this.boardRowPoint] = true;
  };

  // :: Generating a unique number in the row and column and square of the board
  generateNumber = function () {
    let randNum = Math.ceil(Math.random() * this.boardSize),
      _countFilledFields = this.countFilledFields();
    while (
      this.checkNumInRow(randNum) ||
      this.checkNumInSquares(randNum) ||
      this.checkNumInCol(randNum)
    ) {
      this.countGeneratedTimes++;
      // if (this.countGeneratedTimes >= 500000) alert("Stop...");
      if (
        !this.fieldChecked[this.boardRowPoint] &&
        _countFilledFields >= this.boardSize
      )
        this.possibleNums();
      randNum = Math.ceil(Math.random() * this.boardSize);
    }
    return randNum;
  };

  // :: Filling the `row`
  printInRow = function () {
    while (this.boardRowPoint < this.boardSize) {
      let randNum = this.generateNumber();
      this.row[this.boardRowPoint++] = randNum;
    }
    this.boardRowPoint = 0;
    this.countRowFilledTimes = 0;
    for (let i in this.fieldChecked) this.fieldChecked[i] = false;
  };

  // :: Filling the `squares`
  printInSquares = function () {
    let count = 0;

    for (let i = 0; i < this.squareSize; i++)
      this.squares[i][this.squareColPoint] = this.row.slice(
        this.firstIdxs[count],
        this.firstIdxs[++count]
      );
    this.squareColPoint++;

    // : Reset the squares when tehy are complete :
    if (this.squareColPoint >= this.squareSize) {
      for (let i = 0; i < this.squareSize; i++) {
        for (let j = 0; j < this.squareSize; j++)
          this.squares[i][j].fill(this.blank, 0);
      }
      this.squareColPoint = 0;
    }
  };

  // :: Print in the `board` and reset the `row`
  printInBoard = function () {
    this.board[this.boardColPoint++] = this.row.slice(0);
    this.row.fill(this.blank, 0);
  };

  create = function () {
    while (this.boardColPoint < this.boardSize) {
      this.printInRow();
      this.printInSquares();
      this.printInBoard();
    }
  };
}
