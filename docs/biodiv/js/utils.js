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

// Get column data in a table
//    @params id_table A string.
//    @params col_name A string.
//    @return An array.
function getColData(table, col_name, list_with_index=false){
  // var table = document.getElementById("meta_setting_table");
  // var col_name = "type";
  const col_no   = getColNames(table).indexOf(col_name);
  const col_type = getDataType(table)[col_no];
  var group_value = [];
  for(Ri = 0; Ri < table.rows.length - 1; Ri++){
    // except th (rows[0])
    if(list_with_index && col_type === "select-one"){
      group_value[Ri] = table.rows[Ri + 1].cells[col_no].firstChild.selectedIndex;
    } else {
      group_value[Ri] = getCellData(table.rows[Ri + 1].cells[col_no], col_type);
    }
  }
  return group_value;
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

// Get input value, select-one, or innerHTML cell data in a table.
//    In BISS, the values varies input, select-one, or innerHTML. 
//    getCellData() 
//    @params cell_data A td element in a table.
//    @params data_type A string to specify the data type of the cell, 
//                      which can be retrived with col_type().
//    @return A string.
function getCellData(cell_data, data_type){
  switch(data_type){
    case "date":
    case "no":
    case "fixed":
      return cell_data.innerHTML;
      break;
    case "delButton":
    case "updatebutton":
    case "text":
    case "number":
      return cell_data.firstChild.value;
      break;
    case "checkbox": 
      return cell_data.firstChild.checked;
      break;
    case "select-one":
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

// Get data types from occurrence table.
//    Columns shown below are special, 
//        "date", "delButton", "no", "locLat", "locLon", "locAcc"
//        These columns can not be set by users. 
//    Other columns can be devided into 5 data types: 
//        "fixed", "checkbox", "text", "number", "select-one".
//   @paramas table A table element.
//   @return A string array.
function getDataType(table){
//   const table = document.getElementById(id_table);
  const col_names = getColNames(table);
  const n_col = col_names.length;
  const first_row = table.rows[1].cells;
  var data_type = [];
  for(let Ci = 0; Ci < n_col; Ci++){
    switch(col_names[Ci]){
      case "date":
      case "delButton":
      case "updateButton":
      case "no":
        data_type[Ci] = col_names[Ci];
        break;
      default:
  // console.log(col_names[Ci]);
        var f_child = first_row[Ci].firstChild;
        if(f_child.value === void 0){
          data_type[Ci] = "fixed";
        } else {
          if(f_child.getAttribute("type") === null){
            data_type[Ci] = "select-one";
          } else {
            data_type[Ci] = f_child.getAttribute("type");
          }
        }
      break;
    }
  }
  return data_type;
}

// Helper for getDataType()
function get_data_types(table){
  var types = [];
  for(cell of table.rows[1].cells){ // 1: first td row
    types.push(get_data_type(cell));
  }
  return types;
}

// Helper for getDataType()
function get_data_type(cell){
  return (cell.firstChild.type === void 0) ? "fixed" : cell.firstChild.type;
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
    if(table.rows.length > 2){                        // delete more than 3 rows (th + tb*2)
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
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var blob = new Blob([bom, doc], { "type" : "text/tsv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = "biodiv.html";
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}
