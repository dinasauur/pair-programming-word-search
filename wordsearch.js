const wordSearch = (letters, word) => {
  if (letters.length <= 0) {
    return false;
  };

  const reversedWord = word.split("").reverse().join("");

  const horizontalJoin = letters.map(ls => ls.join(''));
  for (l of horizontalJoin) {
    if (l.includes(word) || l.includes(reversedWord)) {
      return true;
    }
  }

  const verticalTranspose = transpose(letters);
  const verticalJoin = verticalTranspose.map(ls => ls.join(''));
  for (l of verticalJoin) {
    if (l.includes(word) || l.includes(reversedWord)) {
      return true;
    }
  }

  return diagonal(letters, word);
};

const transpose = function(matrix) {
  const result = [];

  for (let i = 0; i < matrix[0].length; i++) {
    const row = [];
    for (let j = 0; j < matrix.length; j++) {
      row.push(matrix[j][i]);
    } result.push(row);
  }
  return result;
};

function diagonal(words, search) {
  const n_rows = words.length;
  const n_col = words[0].length;
  let found = '';
  let coord = [];
  k = 0;

  rowLoop:
  for (let i = 0; i < n_rows; i++) {
    for (let k = 0; k < n_col; k++) {
      if (searchDiagonalLeft(search, words, i, k) || searchDiagonalRight(search, words, i, k)) {
        console.log('found');
        return true;
      }
    }
  }
  return false;
}

function searchDiagonalRight(search, words, row, col) {
  const n_rows = words.length - 1;
  const n_col = words[0].length - 1;

  let letter;
  let nextRow;
  let nextCol;
  for (let i = 0; i < search.length - 1; i++) {
    nextRow = row + i;
    nextCol = col + i;
    if (nextRow > n_rows) { return false; }
    if (nextCol > n_col) { return false; }
    letter = words[nextRow][nextCol];

    if (letter !== search[i]) {
      return false;
    }
  }
  return true;
}

function searchDiagonalLeft(search, words, row, col) {
  const n_rows = words.length - 1;

  let letter;
  let nextRow;
  let nextCol;
  for (let i = 0; i < search.length - 1; i++) {
    nextRow = row + i;
    nextCol = col - i;
    if (nextRow > n_rows) { return false; }
    if (nextCol < 0) { return false; }
    letter = words[nextRow][nextCol];

    if (letter !== search[i]) {
      return false;
    }
  }
  return true;
}

module.exports = wordSearch;