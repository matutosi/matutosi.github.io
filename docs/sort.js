// https://blog.ver001.com/javascript-table-sort/
let column_no = 0;       // now clicked
let column_no_prev = 0;  // previous clicked
window.addEventListener('load', function () {
  document.querySelectorAll('#sort_table th').forEach(elm => {
    elm.onclick = function () {
      column_no = this.cellIndex;  // now clicked
      let table = this.parentNode.parentNode.parentNode;
      let sortType = 0;              // 0:numeric 1:string
      let sortArray = new Array;     // array in clicked column
      for (let r = 1; r < table.rows.length; r++) {
        // col number and value
        let column = new Object;
        column.row = table.rows[r];
        column.value = table.rows[r].cells[column_no].textContent;
        sortArray.push(column);
        // is numeric ?
        if (isNaN(Number(column.value))) {
          sortType = 1; // string sort when can not convert to numeric
        }
      }
      if (sortType == 0) { // numeric sort
        if (column_no_prev == column_no) { // clicked: sort reverse
          sortArray.sort(compareNumberDesc);
        } else {
          sortArray.sort(compareNumber);
        }
      } else { // string sort
        if (column_no_prev == column_no) { // clicked: sort reverse
          sortArray.sort(compareStringDesc);
        } else {
          sortArray.sort(compareString);
        }
      }
      // add tbody to sorted tr object 
      let tbody = this.parentNode.parentNode;
      for (let i = 0; i < sortArray.length; i++) {
        tbody.appendChild(sortArray[i].row);
      }
      // save column numbers for ascending/descending sort switching
      if (column_no_prev == column_no) {
        column_no_prev = -1; // descending sort
      } else {
        column_no_prev = column_no;
      }
    };
  });
});

function compareNumber    (a, b) { return a.value - b.value; }   // numeric sort (asc)
function compareNumberDesc(a, b) { return b.value - a.value; }  // numeric sort (desc)
function compareString(a, b) {  // string sort (asc)
  if (a.value < b.value) { return -1; } else { return 1; }
  return 0;
}
function compareStringDesc(a, b) { // string sort (desc)
  if (a.value > b.value) { return -1; } else { return 1; }
  return 0;
}
