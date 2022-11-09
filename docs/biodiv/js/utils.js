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
//    @params obj An object.
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
//    @params obj   An object.
//    @params index A numeric.
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
//    @params id_table A string.
//    @params col_name A string.
//    @return An array.
function getColData(table, col_name, list_with_index=false){
  // var table = document.getElementById("meta_setting_table");
  // var col_name = "type";
  const col_no   = getColNames(table).indexOf(col_name);
  const col_type = getDataTypes(table)[col_no];
  var group_value = [];
  for(Ri = 0; Ri < table.rows.length - 1; Ri++){
    // except th (rows[0])
    if(list_with_index && col_type === "list"){
      group_value[Ri] = table.rows[Ri + 1].cells[col_no].firstChild.selectedIndex;
    } else {
      group_value[Ri] = getCellData(table.rows[Ri + 1].cells[col_no], col_type);
    }
  }
  return group_value;
}

// Get input value, list, or innerHTML cell data in a table.
//    In BISS, the values varies input, list, or innerHTML. 
//    getCellData() 
//    @params cell_data A td element in a table.
//    @params data_type A string to specify the data type of the cell, 
//                      which can be retrived with col_type().
//    @return A string.
function getCellData(cell_data, data_type){
  switch(data_type){
  //     case "DATE":
  //     case "NO":
    case "fixed":
      return cell_data.innerHTML;
      break;
  //     case "DELETE":
  //     case "UPDATE_TIME_GPS":
    case "button":
    case "text":
    case "number":
      return cell_data.firstChild.value;
      break;
    case "checkbox": 
      return cell_data.firstChild.checked;
      break;
    case "list":
      var opts = getSelectOptionInCell(cell_data.firstChild);
      var index = cell_data.firstChild.selectedIndex;
      return opts[index];
      break;
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
//    @params array An array.
//    @params group An array.
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
//   @paramas table A table element.
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
  var table = table.querySelectorAll("tr:not([class=hide_button]"); // remove tr with hide buttons
  for(cell of table[2].cells){                                      // 1: first data row (0: colnames)
    types.push(getDataTypeCell(cell));
  }
  return types;
}

// Helper for getDataType()
function getDataTypeCell(cell){
  var type = (cell.firstChild.type === void 0) ? "fixed" : cell.firstChild.type;
  if(type === 'select-one') var type = 'list';
  return type;
}

// Get column names as a string array.
//   @paramas table A table element.
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
//   @paramas  obj An element of input button of a row in a table.
function delRow(obj){
    var table = obj.parentNode.parentNode.parentNode; // clicked table
    if(table.rows.length > 3){                        // delete more than 3 rows (th + tb * 2)
      var tr = obj.parentNode.parentNode;             // clicked row
      tr.parentNode.deleteRow(tr.sectionRowIndex);    // delete clicked row
    }
}

// Helper to createElement(), setAttribute(), innerHTML, textContent
//   @paramas el A string for element name.
//   @paramas ats An array with attribute names. {id: "hoge", value: "foo"}
//   @paramas ih,tc A string for innerHTML and textContent.
//            Both of them are given, ih is overwritten by tc.
//   @return HTML An object.
//   @examples 
//   crEl({ el: 'p', ats: {id: "id_test", class: "some_class"}, ih: "test" });
function crEl({ el, ats, ih, tc }){
  var ele = document.createElement(el);
  if(ats != void 0){
    var keys  = Object.keys(ats);
    for(key of keys){ ele.setAttribute(key, ats[key]); }
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
