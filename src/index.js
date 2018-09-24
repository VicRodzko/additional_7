module.exports = function solveSudoku(matrix) {
  
  let puzzleMatrix = [];
  let matrixString = "";

  for (let i = 0; i < matrix.length; i++) {
      matrixString += matrix[i].join('');
  }

  function solveMatrix (matrixString) {
      puzzleMatrix = matrixString.split('').map(cell => +cell);

      if (matrixString.length !== 81) return 'Wrong matrix!';
      if (!getCell(0) == true) return 'There is no decision!';
      
      return breakInRow(puzzleMatrix);
  }

  function getCell(index) {
      if (index >= puzzleMatrix.length) return true;
      else if (puzzleMatrix[index] != 0) return getCell(index + 1);

      for (let k = 1; k <= 9; k++) {
          if (checkCell(k, Math.floor(index / 9), index % 9) == true) {
              puzzleMatrix[index] = k;
              if (getCell(index + 1) == true) return true;
          }
      }

      puzzleMatrix[index] = 0;
      return false;
  }

  function checkCell(number, row, column) {
      for (let j = 0; j < 9; j++) {
          let findIndex = ((Math.floor(row / 3) * 3) + Math.floor(j / 3)) * 9 + (Math.floor(column / 3) * 3) + (j % 3);
          if (number == puzzleMatrix[(row * 9) + j] || number == puzzleMatrix[column + (j * 9)] || number == puzzleMatrix[findIndex]) return false;
      }
      return true;
  }

  function breakInRow(arr) {
      let resultMatrix = [];
      for (let l = 0; l < arr.length; l += 9) {
          resultMatrix.push(arr.slice(l, l + 9));
      }
      return resultMatrix;
  }

  return solveMatrix (matrixString);
}
