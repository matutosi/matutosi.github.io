// Change table view wide <--> short. 
//   Short table hide th and show label in td.
//   
//    In BISS, input button is generated by following functions.
//        createShowShortTable()
//        createShowWideTable
//    @paramas obj   A input element.
//                   Normally use "this". 
//    @paramas table A table element.
function shortTable(obj){
  var table = obj.parentNode.nextElementSibling;
  var rows = table.rows;
  rows[0].style.display = 'none';
  for(let Ri = 1; Ri < rows.length; Ri++){
    var tr = rows[Ri];
    tr.style.display = "flex";
    tr.style["flex-wrap"] = "wrap";
  }
  addThLabel(table);
  obj.replaceWith( createShowWideTable() );
}
function wideTable(obj){
  var table = obj.parentNode.nextElementSibling;
  var rows = table.rows;
  for(let Ri = 0; Ri < rows.length; Ri++){
    var tr = rows[Ri];
    tr.style.display = "";
    tr.style["flex-wrap"] = "";
  }
  removeThLabel(table);
  obj.replaceWith( createShowShortTable() );
}
function addThLabel(table){
  var c_names = getColNames(table);
  var rows = table.rows;
  for(let Ri = 1; Ri < rows.length; Ri++){
    var row = rows[Ri];
    for(let Cj = 0; Cj < row.cells.length; Cj++){
      var td = row.cells[Cj];
      td.setAttribute("th-lab", c_names[Cj] + ": ")
    }
  }
}
function removeThLabel(table){
  var rows = table.rows;
  for(let Ri = 1; Ri < rows.length; Ri++){
    var row = rows[Ri];
    for(let Cj = 0; Cj < row.cells.length; Cj++){
      var td = row.cells[Cj];
      td.removeAttribute("th-lab");
    }
  }
}
