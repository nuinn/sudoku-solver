// const sudokuGameTemplate = [
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
//   [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
// ];

// const sudokuGame1 = [
//   [undefined, 5, 2, undefined, undefined, 6, undefined, undefined, undefined],
//   [1, 6, undefined, 9, undefined, undefined, undefined, undefined, 4],
//   [undefined, 4, 9, 8, undefined, 3, 6, 2, undefined],
//   [4, undefined, undefined, undefined, undefined, undefined, 8, undefined, undefined],
//   [undefined, 8, 3, 2, undefined, 1, 5, 9, undefined],
//   [undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, 2],
//   [undefined, 9, 7, 3, undefined, 5, 2, 4, undefined],
//   [2, undefined, undefined, undefined, undefined, 9, undefined, 5, 6],
//   [undefined, undefined, undefined, 1, undefined, undefined, 9, 7, undefined],
// ];

// const sudokuGame2 = [
//   [undefined, 7, undefined, undefined, 2, undefined, undefined, 4, 6],
//   [undefined, 6, undefined, undefined, undefined, undefined, 8, 9, undefined],
//   [2, undefined, undefined, 8, undefined, undefined, 7, 1, 5],
//   [undefined, 8, 4, undefined, 9, 7, undefined, undefined, undefined],
//   [7, 1, undefined, undefined, undefined, undefined, undefined, 5, 9],
//   [undefined, undefined, undefined, 1, 3, undefined, 4, 8, undefined],
//   [6, 9, 7, undefined, undefined, 2, undefined, undefined, 8],
//   [undefined, 5, 8, undefined, undefined, undefined, undefined, 6, undefined],
//   [4, 3, undefined, undefined, 8, undefined, undefined, 7, undefined],
// ];

// const sudokuGame3 = [
//   [2, undefined, undefined, undefined, undefined, undefined, 6, 9, undefined],
//   [undefined, 5, undefined, undefined, undefined, 3, undefined, undefined, undefined],
//   [1, 7, undefined, undefined, undefined, 9, 4, undefined, 5],
//   [undefined, undefined, 3, undefined, 2, 5, undefined, 1, 8],
//   [undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined],
//   [7, 2, undefined, 3, 8, undefined, 5, undefined, undefined],
//   [5, undefined, 2, 6, undefined, undefined, undefined, 4, 1],
//   [undefined, undefined, undefined, 5, undefined, undefined, undefined, 7, undefined],
//   [undefined, 6, 7, undefined, undefined, undefined, undefined, undefined, 3],
// ];

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

function findUniquePossibility({ game, row }) {
  for (let i = 0; i < game.length; i++) {
    const line = row ? game[i] : i;
    const counter = {};
    for (let j = 0; j < game.length; j++) {
      const cell = row ? line[j] : game[j][line];
      if (typeof cell === 'object') {
        for (let k = 0; k < cell.length; k++) {
          const possibleNumber = cell[k];
          counter[possibleNumber] = counter[possibleNumber] ? counter[possibleNumber] + 1 : 1;
        }
      }
    }
    let uniqueValue = Object.keys(counter).find(key => counter[key] === 1);
    if (uniqueValue) {
      uniqueValue = parseInt(uniqueValue);
      let lineNumber;
      for (let l = 0; l < game.length; l++) {
        const cell = row ? line[l] : game[l][line];
        if (typeof cell === 'object') {
          for (let m = 0; m < game.length; m++) {
            if (cell[m] === uniqueValue) {
              lineNumber = l;
              continue;
            }
          }
        }
      }
      const uniqueValueData = {
        uniqueValue,
        rowValue: row ? i : lineNumber,
        columnValue: row ? lineNumber : i,
      };
      return uniqueValueData;
    }
  }
  return false;
}

// function findUniquePossibilityInRow({ game }) {
//   for (let h = 0; h < game.length; h++) {
//     const currentRow = game[h];
//     const rowCounter = {};
//     for (let i = 0; i < currentRow.length; i++) {
//       const cell = currentRow[i];
//       if (typeof cell === 'object') {
//         for (let j = 0; j < cell.length; j++) {
//           const possibleNumber = cell[j];
//           rowCounter[possibleNumber] = rowCounter[possibleNumber] ? rowCounter[possibleNumber] + 1 : 1;
//         }
//       }
//     }
//     let uniqueValue = Object.keys(rowCounter).find(key => rowCounter[key] === 1);
//     if (uniqueValue) {
//       uniqueValue = parseInt(uniqueValue);
//       let column;
//       for (let k = 0; k < currentRow.length; k++) {
//         const cell = currentRow[k];
//         if (typeof cell === 'object') {
//           for (let l = 0; l < cell.length; l++) {
//             const element = cell[l];
//             if (element === uniqueValue) {
//               column = k;
//             }
//           }
//         }
//       }
//       const uniqueValueData = {
//         uniqueValue,
//         row: h,
//         column,
//       };
//       return uniqueValueData;
//     }
//   }
//   return false;
// }

function checkGrid({ game, pushPairs }) {
  let singlesChecker = 0;
  for (let i = 0; i < game.length; i++) {
    const currentRow = game[i];
    for (let j = 0; j < currentRow.length; j++) {
      const cell = currentRow[j];
      if (!cell) {
        const possibleValues = getPossibleValues({ game, rowID: i, columnID: j });
        if (possibleValues.length === 1) {
          singlesChecker++;
          const solvedValueString = possibleValues.join();
          const solvedValue = parseInt(solvedValueString);
          game[i][j] = solvedValue;
        }
        if (pushPairs) {
          game[i][j] = possibleValues;
        }
      }
    }
  }
  if (singlesChecker) {
    return game;
  }
  else {
    return false;
  }
}
let i = 0;
function solveSudoku({ game }) {
  i++;
  const stateOfGame = checkGrid({ game, pushPairs: false });
  if (!stateOfGame) {
    const gameCopy = game.map(row => {
      return row.slice(); });
    checkGrid({ game: gameCopy, pushPairs: true });
    const uniqueRowData = findUniquePossibility({ game: gameCopy, row: true });
    if (uniqueRowData) {
      // console.log(uniqueRowData);
      game[uniqueRowData.rowValue][uniqueRowData.columnValue] = uniqueRowData.uniqueValue;
      console.log('game: ',i,'I have found a unique row element');
      solveSudoku({ game });
    }
    const uniqueColumnData = findUniquePossibility({ game: gameCopy, row: false, });
    if (uniqueColumnData) {
      // console.log(uniqueColumnData);
      game[uniqueColumnData.rowValue][uniqueColumnData.columnValue] = uniqueColumnData.uniqueValue;
      console.log('game: ',i,'I have found a unique column element');
      solveSudoku({ game });
    }
  }
  else {
    const isGameLive = stateOfGame.find(row => row.includes(undefined));
    if (isGameLive) {
      console.log('game: ',i,'I can play normally.');
      solveSudoku({ game });
    }
    else {
      console.log(game,'Game completed');
      return;
    }
  }
}

solveSudoku({ game: sudokuGame4 });
