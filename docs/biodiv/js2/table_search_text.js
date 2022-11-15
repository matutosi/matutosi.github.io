// Search text input tags in a table and show only matching rows
//    Clear input text, ALL rows will be shown.
//    Regular expression can be used.
//    @paramas obj  A input element.
//                  Normally use "this". 
function searchTableText(obj){
  // console.log(obj);
  // console.log(obj.value);
  // console.log(obj.parentNode.nextElementSibling);
  var input = obj.value;
  var reg_ex = new RegExp(input, 'i');  // i: case-insensitive
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var trs   = table.rows;
  //   var data_types = getDataType(table);
  var data_types = getDataTypes(table);
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
    if(input === "")        { trs[k].style.display = ""; }
  }
}

// Search text input tags in a table and show only matching rows
//    Clear input text, NO rows will be shown.
//    Regular expression can be used.
//    Spaces means match all text. 
//        ex.) "aaa bbb" matches texts including both "aaa" and "bbb".
//    @paramas obj  A input element.
//                  Normally use "this". 
function searchTableTextShow(obj){
  var input = obj.previousElementSibling.value;
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var trs    = table.rows;
  if(input === ""){
    for(let Rj = 1; Rj < trs.length; Rj++){
      trs[Rj].style.display = "none";
    }
    return void 0;
  }
  // look ahead: https://www-creators.com/archives/5332
  input = "^(?=.*" + input.replaceAll(" ", ")(?=.*") + ").*$";
  var reg_ex = new RegExp(input, 'i');  // i: case-insensitive
  var matches = 0;
  for(let Rj = 1; Rj < trs.length; Rj++){ trs[Rj].style.display = "none"; }
  for(let Rj = 1; Rj < trs.length; Rj++){
    if(matches > 101){
      alert("Over 100 matches, showing 100 matches")
      return void 0;
    }
    var text = trs[Rj].cells[0].innerText;
    if(reg_ex.test(text)){
      trs[Rj].style.display = "";
      matches++;
    }
  }
}
