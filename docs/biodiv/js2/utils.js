// Make look ahead regular expression
//    @param   A string.
//    @return  A regular expression.
//    @examples
//    var input = 'イシ ナラ';
//    var reg_ex = makeLookAheadReg(input);
//    grepArray(wamei, reg_ex);
//    @reference
//      look ahead: https://www-creators.com/archives/5332
function makeLookAheadReg(input){
  var look_ahead = "^(?=.*" + input.replaceAll(" ", ")(?=.*") + ").*$";
  var reg_ex = new RegExp(look_ahead, 'i');  // i: case-insensitive
  return reg_ex;
}

// Use namespace like shiny::NS.
//  @examples
//  var ns = NS('plot');
//  ns('table');
//  // 'plot-table'
//  
function NS(namespace){
  var f = function f(id){
    return namespace + '-' + id;
  }
  return f;
}

// Convert hasy array table
//    In progress: can not convert hasy that has array as a value
//    @example 
//    var hash_array = sumWithGroup("occurrence", "Cover", "Layer");
//    hash2table(hasy_array);
//    
function hash2table(hash_array){
  var table = document.createElement('table');
  for(let i = 0; i < Object.keys(hash_array).length; i++){
    var tr = document.createElement('tr');
    tr.appendChild( crEl({ el: 'td', tc: Object.keys(hash_array)[i] }) );
    tr.appendChild( crEl({ el: 'td', ih: Object.values(hash_array)[i] }) );
    table.appendChild(tr);
  }
  return table
}

// Check if an object is or has table. 
//    @param obj An object.
//    @return A logical.
function isTable(obj){
  return obj.tagName === 'TABLE';
}
function hasTable(obj){
  return obj.getElementsByTagName('table').length > 0;
}

// Search parent table of a object
//    Search parentNode of a object.
//    When object has multiple tables, return the first table in default.
//    Can return another table by using index.
//    @param obj   An object.
//    @param index A numeric.
//    @return A table.
function searchParentTable(obj, index = 0){
  while( !isTable(obj) && !hasTable(obj) ){
    var obj = obj.parentNode;
  }
  if(isTable(obj)){
    return obj;
  }else{
    return obj.getElementsByTagName("table")[index];
  }
}

// Get column data in a table
//    @param id_table A string.
//    @param col_name A string.
//    @return An array.
//    @examples
//    var table = document.getElementById('input_occ_pl_1_tb');
//    var tds = table.rows[2].cells;
//    for(let name of getColNames(table)){ console.log(getColData(table, name, true)) }
//    for(let td of tds                 ){ console.log(getCellData(td, true)) }
//    for(let td of tds                 ){ console.log(getCellData(td)) }
function getColData(table, col_name, list_with_index = false){
  const col_no   = getColNames(table).indexOf(col_name);
  var group_value = [];
  var table = table.querySelectorAll("tr:not([class=hide_button])");
  for(Ri = 1; Ri < table.length; Ri++){    // except th (rows[0])
    group_value[Ri - 1] = getCellData(table[Ri].cells[col_no], list_with_index)
  }
  return group_value;
}

// Get input value, list, or innerHTML cell data in a table.
//    In BISS, the values varies input, list, or innerHTML. 
//    getCellData() 
//    @param cell_data A td element in a table.
//    @param data_type A string to specify the data type of the cell, 
//                      which can be retrived with col_type().
//    @return A string.
function getCellData(td, list_with_index = false){
  if(td.firstChild === void 0){ return ''; }
  if(td.firstChild === null  ){ return ''; }
  if(td.firstChild.value === void 0){
    return td.innerHTML;
  }else{
    if(td.firstChild.type === 'checkbox'){
      return td.firstChild.checked;
    }else{
      if(list_with_index === true && td.firstChild.tagName === 'SELECT'){
        return td.firstChild.selectedIndex;
      }else{
        return td.firstChild.value;
      }
    }
  }
}


// Get options in select tag in a cell
//    Return string array.
function getSelectOptionInCell(select){
  var select_opt = [];
  var opts = select.children;
  for(let i = 0; i < opts.length; i++){ select_opt.push(opts[i].value); }
  return select_opt;
}

// Split array by group
//    @param array An array.
//    @param group An array.
//    @return Grouped array. 
//    @examples
//    var array = [ 1,   2,   3,   4];
//    var group = ["a", "b", "a", "b"];
//    splitByGroup(array, group);
//    // [a: [1,3], b: [2,4]]
function splitByGroup(array, group){
  if(array.length !== group.length){ return array; }
  var grouped = [];
  for(let i=0; i < array.length; i++){ grouped[group[i]] = []; }
  for(let i=0; i < array.length; i++){
    grouped[group[i]].push(array[i]);
  }
  return grouped;
}


// DEPRECATED, use getDataTypes()
// 
// Get data types from occurrence table.
//    Columns shown below are special, 
//        "DATE", "DELETE", "NO", "LOC_LAT", "LOC_LON", "LOC_ACC":
//        These columns can not be set by users. 
//    Other columns can be devided into 5 data types: 
//        "fixed", "checkbox", "text", "number", "list".
//   @param table A table element.
//   @return        A string array.
// function getDataType(table){
// //   const table = document.getElementById(id_table);
//   const col_names = getColNames(table);
//   const n_col = col_names.length;
//   const first_row = table.rows[2].cells; // 2: data, (0: colnames, 1: hide buttons)
//   var data_type = [];
//   for(let Ci = 0; Ci < n_col; Ci++){
//     switch(col_names[Ci]){
//       case "DATE":
//       case "DELETE":
//       case "UPDATE_TIME_GPS":
//       case "NO":
//         data_type[Ci] = col_names[Ci];
//         break;
//       default:
//   // console.log(col_names[Ci]);
//         var f_child = first_row[Ci].firstChild;
//         if(f_child.value === void 0){
//           data_type[Ci] = "fixed";
//         } else {
//           if(f_child.getAttribute("type") === null){
//             data_type[Ci] = "list";
//           } else {
//             data_type[Ci] = f_child.getAttribute("type");
//           }
//         }
//       break;
//     }
//   }
//   return data_type;
// }



// Helper for getDataType()
function getDataTypes(table){
  var types = [];
  var table = table.querySelectorAll("tr:not([class=hide_button])"); // remove tr with hide buttons
  for(let cell of table[1].cells){                                   // 1: first data row (0: colnames)
    types.push(getDataTypeCell(cell));
  }
  return types;
}

// Helper for getDataType()
function getDataTypeCell(cell){
  if(cell.firstChild === null){ return "fixed"; }
  var type = (cell.firstChild.type === void 0) ? "fixed" : cell.firstChild.type;
  if(type === 'select-one') var type = 'list';
  return type;
}

// Get column names as a string array.
//   @param table A table element.
//   @return A string array.
function getColNames(table){
  // console.log(table.rows[0]);
  const row_0 = table.rows[0];
  const col_names = [];
  for(let Ri=0; Ri<row_0.cells.length; Ri++){
    col_names[Ri] = row_0.cells[Ri].innerText;
  }
  return col_names
}

// Get time like 2022_05_18_15_51_28: yyyy-mm-dd-hh-mm-ss
function getNow(){
   var now = new Date();
   const yr  = now.getFullYear();
   const mo  = String(now.getMonth()+1).padStart(2, `0`); // getMonth() return 0 when January
   const dd  = String(now.getDate()).padStart(2, `0`);
   const hh  = String(now.getHours()).padStart(2, `0`);
   const mi  = String(now.getMinutes()).padStart(2, `0`);
   const ss  = String(now.getSeconds()).padStart(2, `0`);
   return(`${yr}_${mo}_${dd}_${hh}_${mi}_${ss}`)
}

// Delete a row in a table.
//   When the raw is the only one row in a table, the row will not be deleted.
//   @param  obj An element of input button of a row in a table.
function delRow(obj){
    var table = obj.parentNode.parentNode.parentNode; // clicked table
    if(table.rows.length > 3){                        // delete more than 3 rows (th + tb * 2)
      var tr = obj.parentNode.parentNode;             // clicked row
      tr.parentNode.deleteRow(tr.sectionRowIndex);    // delete clicked row
    }
}

// Helper to createElement(), setAttribute(), innerHTML, textContent
//   @param el A string for element name.
//   @param ats An array with attribute names. {id: "hoge", value: "foo"}
//   @param ih,tc A string for innerHTML and textContent.
//            Both of them are given, ih is overwritten by tc.
//   @return HTML An object.
//   @examples 
//   crEl({ el: 'p', ats: {id: "id_test", class: "some_class"}, ih: "test" });
function crEl({ el, ats, ih, tc }){
  var ele = document.createElement(el);
  if(ats != void 0){
    var keys  = Object.keys(ats);
    for(let key of keys){ ele.setAttribute(key, ats[key]); }
  }
  if(ih != void 0){ ele.innerHTML   = ih; }
  if(tc != void 0){ ele.textContent = tc; }
  return ele;
}

// Save html as it is.
//   Crtl + S can save an original html file 
//   that is not generated by JavaScript.
//   saveHTML() save the generated html file as it is.
function saveHTML(obj){
  var doc = document.documentElement.outerHTML;
  downloadStrings(strings = doc, file_name = "biodiv.html")
}
