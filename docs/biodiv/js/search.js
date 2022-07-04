// Search text input tags in a table and show only matching rows
//    Clear input text, all rows will be shown.
//    Regular expression can be used.
//    
function searchTable(id_table, text){
  // function searchTable(id_table, id_text){
  var input = text.value;
  var reg_ex = new RegExp(input, 'i');  // i: case-insensitive
  var table  = document.getElementById(id_table);
  var trs    = table.rows;
  var data_types = getDataType(table);
  var display_flag = [1];                // 1: show first row (th)
  for(let Rj = 1; Rj < trs.length; Rj++){ display_flag[Rj] = 0; }
  for(let Ci = 0; Ci < data_types.length; Ci++){
    if(data_types[Ci] === "text"){
      for(let Rj = 1; Rj < trs.length; Rj++){
        var text = trs[Rj].cells[Ci].firstChild.value;
        if(reg_ex.test(text)){ display_flag[Rj]++; }
      }
    }
  }
  for(let k = 1; k < display_flag.length; k++){
    if(display_flag[k] > 0) { trs[k].style.display = "";     }
    else                    { trs[k].style.display = "none"; }
    if(input === "")        { trs[k].style.display = "";     } // no input, show all
  }
}

