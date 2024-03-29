// Hide / show row or column in a table
//    In BISS, input button is generated by following functions.
//        createShortTable()
//        createWideTable()
//        createHideRowButton()
//        createShowRowButton()
//        createShowColButton()
//    @param obj  A input element.
//                  Normally use "this". 
function showRow(obj){
  var tr = obj.parentNode.parentNode;
  var table = obj.parentNode.parentNode.parentNode;
  var c_names = getColNames(table);
  if(table.rows[0].style.display === 'none'){
    var disp = 'inline-block';
  }else{
    var disp = '';
  }
  for(let i = 0; i < tr.cells.length; i++){
    var td = tr.cells[i];
  //     var label = c_names[i].toLowerCase();
    var label = c_names[i];
    switch(label){
      case "PLOT": // remain td
        break;
      default:
        td.style.display = disp;
        break;
    }
  }
  obj.replaceWith( createHideRowButton("plot info") );
}
function hideRow(obj){
  var tr = obj.parentNode.parentNode;
  var table = obj.parentNode.parentNode.parentNode;
  var c_names = getColNames(table);
  for(let i = 0; i < tr.cells.length; i++){
    var td = tr.cells[i];
  //     var label = c_names[i].toLowerCase();
    var label = c_names[i];
    switch(label){
      case "PLOT": // remain td
        break;
      default:
        td.style.display = 'none';
        break;
    }
  }
  obj.parentNode.style.display = ''; // show button
  obj.replaceWith( createShowRowButton("plot info") );
}
function showAllCols(obj){
console.log(obj.parentNode.parentNode.nextElementSibling);
  var table = obj.parentNode.parentNode.parentNode.querySelectorAll("table")[0];
  for(let Ci = 0; Ci < table.rows[0].cells.length; Ci++){
    for(let Rj = 0; Rj < table.rows.length; Rj++){
      table.rows[Rj].cells[Ci].style.display = '';
    }
  }
  obj.parentNode.textContent = "";
}
function hideTableCol(obj){
  // console.log(obj.parentNode.parentNode.parentNode);
  var table = obj.parentNode.parentNode.parentNode.parentNode.querySelectorAll("table")[0];
  var c_no = obj.parentElement.cellIndex;
  var c_name = table.rows[0].cells[c_no].innerText;
  // console.log(c_name);
  for(let Rj = 0; Rj < table.rows.length; Rj++){
    table.rows[Rj].cells[c_no].style.display = 'none';
  }
  var span = obj.parentNode.parentNode.parentNode.previousElementSibling.lastElementChild;
  // tc: "Show "
  if(span.children.length === 0){
    span.textContent = "Show: ";
    span.appendChild( createInput({ type:"button", value:"All cols", onclick:"showAllCols(this)"}) );
  }
  span.appendChild( createShowColButton(c_name) );
}
function showCol(obj){
  // show col
  var c_name = obj.value;
  var table = obj.parentNode.parentNode.parentNode.querySelectorAll("table")[0];
  var c_no = getColNames(table).indexOf(c_name);
  for(let Rj = 0; Rj < table.rows.length; Rj++){
      table.rows[Rj].cells[c_no].style.display = '';
  }
  // remove
  if(obj.parentNode.children.length === 1){ obj.parentNode.textContent = ""; }
  obj.remove();
}
function hideShowNext(obj){
  // console.log(obj);
  // console.log(obj.parentNode.nextElementSibling);
  var span   = obj.nextElementSibling.nextElementSibling;
  var next   = obj.parentNode.nextElementSibling;
  var next_2 = obj.parentNode.nextElementSibling.nextElementSibling;
  if(next.style.display === 'none'){
    span.style.display = '';
    next.style.display = '';
    next_2.style.display = '';
    obj.value = "Hide table";
  } else {
    span.style.display = 'none';
    next.style.display = 'none';
    next_2.style.display = 'none';
    obj.value = "Show table";
  }
}
