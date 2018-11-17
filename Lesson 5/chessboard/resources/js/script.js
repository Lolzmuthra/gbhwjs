let root = document.getElementById('chessboard');
let alph = 'ABCDEFGH'.split('');
const SIZE = 8;

for (let i = 0; i < SIZE + 1; i++) {
    let row = getNewBindedNode(root, i % 2 === 0 ? 'odd-row' : 'even-row');
    for (let j = 0; j < SIZE + 1; j++) {
        let cell = getNewBindedNode(row, getCellClass(i, j), getCellText(i, j));
    }
}

function getNewBindedNode(rootNode, className, newInnerText) {
    let result = document.createElement('div');
    rootNode.appendChild(result);
    result.setAttribute('class', className);
    if (newInnerText !== undefined) {
        result.innerHTML = newInnerText;
    }
    return result;
}

function getCellClass(row, column) {
    return row === 0 || column === SIZE ? 'not-cell' : 'cell';
}

function getCellText(row, column) {
    if (row === 0 && column === SIZE ) return '';
    if (row === 0) return alph[column];
    if (column === SIZE) return SIZE + 1 - row;

    if (row === 2) return '&#9823;';
    if (row === 1 && column === 0 || row === 1 && column === 7) return '&#9820;';
    if (row === 1 && column === 1 || row === 1 && column === 6) return '&#9822;';
    if (row === 1 && column === 2 || row === 1 && column === 5) return '&#9821;';
    if (row === 1 && column === 3) return '&#9819;';
    if (row === 1 && column === 4) return '&#9818;';
    if (row === 7) return '&#9817;';
    if (row === 8 && column === 0 || row === 8 && column === 7) return '&#9814;';
    if (row === 8 && column === 1 || row === 8 && column === 6) return '&#9816;';
    if (row === 8 && column === 2 || row === 8 && column === 5) return '&#9815;';
    if (row === 8 && column === 3) return '&#9813;';
    if (row === 8 && column === 4) return '&#9812;';
}
