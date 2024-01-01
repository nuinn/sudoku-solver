const sudokuGameTemplate = [
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
];

const sudokuGame1 = [
  [undefined, 5, 2, undefined, undefined, 6, undefined, undefined, undefined],
  [1, 6, undefined, 9, undefined, undefined, undefined, undefined, 4],
  [undefined, 4, 9, 8, undefined, 3, 6, 2, undefined],
  [4, undefined, undefined, undefined, undefined, undefined, 8, undefined, undefined],
  [undefined, 8, 3, 2, undefined, 1, 5, 9, undefined],
  [undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, 2],
  [undefined, 9, 7, 3, undefined, 5, 2, 4, undefined],
  [2, undefined, undefined, undefined, undefined, 9, undefined, 5, 6],
  [undefined, undefined, undefined, 1, undefined, undefined, 9, 7, undefined],
];

const sudokuGame2 = [
  [undefined, 7, undefined, undefined, 2, undefined, undefined, 4, 6],
  [undefined, 6, undefined, undefined, undefined, undefined, 8, 9, undefined],
  [2, undefined, undefined, 8, undefined, undefined, 7, 1, 5],
  [undefined, 8, 4, undefined, 9, 7, undefined, undefined, undefined],
  [7, 1, undefined, undefined, undefined, undefined, undefined, 5, 9],
  [undefined, undefined, undefined, 1, 3, undefined, 4, 8, undefined],
  [6, 9, 7, undefined, undefined, 2, undefined, undefined, 8],
  [undefined, 5, 8, undefined, undefined, undefined, undefined, 6, undefined],
  [4, 3, undefined, undefined, 8, undefined, undefined, 7, undefined],
];

const sudokuGame3 = [
  [2, undefined, undefined, undefined, undefined, undefined, 6, 9, undefined],
  [undefined, 5, undefined, undefined, undefined, 3, undefined, undefined, undefined],
  [1, 7, undefined, undefined, undefined, 9, 4, undefined, 5],
  [undefined, undefined, 3, undefined, 2, 5, undefined, 1, 8],
  [undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined],
  [7, 2, undefined, 3, 8, undefined, 5, undefined, undefined],
  [5, undefined, 2, 6, undefined, undefined, undefined, 4, 1],
  [undefined, undefined, undefined, 5, undefined, undefined, undefined, 7, undefined],
  [undefined, 6, 7, undefined, undefined, undefined, undefined, undefined, 3],
];

const sudokuGame4 = [
  [undefined, undefined, 6, 5, undefined, undefined, undefined, undefined, 8],
  [undefined, 9, 5, undefined, undefined, undefined, undefined, 2, undefined],
  [7, undefined, undefined, 9, undefined, undefined, 3, undefined, undefined],
  [undefined, undefined, undefined, undefined, 4, undefined, 2, 7, undefined],
  [undefined, undefined, undefined, 8, 7, 3, undefined, undefined, undefined],
  [undefined, 7, 9, undefined, 5, undefined, undefined, undefined, undefined],
  [undefined, undefined, 2, undefined, undefined, 8, undefined, undefined, 9],
  [undefined, 5, undefined, undefined, undefined, undefined, 8, 1, undefined],
  [3, undefined, undefined, undefined, undefined, 5, 4, undefined, undefined],
];

function rowCheck({ game, id, fullDeck }) {
  const currentRow = game[id];
  for (let i = 0; i < currentRow.length; i++) {
    const cell = currentRow[i];
    (cell && fullDeck.includes(cell)) && fullDeck.splice(fullDeck.indexOf(cell), 1);
  }
}

function columnCheck({ game, id, fullDeck }) {
  for (let i = 0; i < game.length; i++) {
    const cell = game[i][id];
    (cell && fullDeck.includes(cell)) && fullDeck.splice(fullDeck.indexOf(cell), 1);
  }
}

function getSquareData({ game, rowID, columnID }) {
  rowID = Math.floor(rowID/3);
  columnID = Math.floor(columnID/3);
  const squareData = [];
  for (let i = 3*rowID; i < 3*(rowID+1); i++) {
    const pertinentRow = game[i];
    for (let j = 3*columnID; j < 3*(columnID+1); j++) {
      squareData.push(pertinentRow[j]);
    }
  }
  return squareData;
}

function squareCheck({ game, rowID, columnID, fullDeck }) {
  const currentSquare = getSquareData({ game, rowID, columnID });
  for (let i = 0; i < currentSquare.length; i++) {
    const cell = currentSquare[i];
    (cell && fullDeck.includes(cell)) && fullDeck.splice(fullDeck.indexOf(cell), 1);
  }
}

function getPossibleValues({ game, rowID, columnID }) {
  const fullDeck = [1,2,3,4,5,6,7,8,9];
  rowCheck({ game, id: rowID, fullDeck });
  columnCheck({ game, id: columnID, fullDeck });
  squareCheck({ game, rowID, columnID, fullDeck });
  return fullDeck;
}

function checkGrid({ game }) {
  for (let i = 0; i < game.length; i++) {
    const currentRow = game[i];
    for (let j = 0; j < currentRow.length; j++) {
      const cell = currentRow[j];
      if (!cell) {
        const possibleValues = getPossibleValues({ game, rowID: i, columnID: j });
        if (possibleValues.length === 1) {
          console.log(possibleValues, i+1, j+1);
          const solvedValueString = possibleValues.join();
          const solvedValue = parseInt(solvedValueString);
          game[i][j] = solvedValue;
        }
      }
    }
  }
  return game;
}

function solveSudoku({ game }) {
  const stateOfGame = checkGrid({ game });
  const isGameLive = stateOfGame.find(row => row.includes(undefined));
  if (isGameLive) {
    solveSudoku({ game });
  }
  else {
    console.log(game);
  }
}

solveSudoku({ game: sudokuGame4 });
