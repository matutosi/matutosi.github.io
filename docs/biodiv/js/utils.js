// TODO:
//    make select option input in HTML
//         (group) for data_types: "text", "select-one"
//         (array) for data_types: "number"
//   decide how to show results
// ocnsole.log(sumByGroup("occurrence", "Cover", "Layer"))



// Unique array
function uniq(array){
  return Array.from(new Set(array));
}

// Convert hasy array table
//    In progress: can not convert hasy that has array as a value
//    @example 
//    var hash_array = sumByGroup("occurrence", "Cover", "Layer");
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

function showSumByGroup(id_input_table, array, group, id_result){
  // console.log(id_table + ", " + array + ", " + group + ", " + id_show);
  var table = document.getElementById(id_result);
  table.replaceWith( sumByGroup(id_input_table, array, group, id_result) );
}

// Sum by group
//     sumByGroup("occurrence", "Cover", "Layer")
//     
function sumByGroup(id_input_table, array, group, id_result){
  // var id_table = "occ_input_table";
  // var array = "Cover";
  // var group = "Layer";
  var table = document.getElementById(id_input_table);
  var array_val = getColData(table, array);
  var group_val = getColData(table, group);
  var grouped_array = splitByGroup(array_val, group_val);
  var groups = Object.keys(grouped_array).sort();
  var sum_array = [];
  for(let i = 0; i < groups.length; i++){ sum_array[groups[i]] = 0; }
  for(let i = 0; i < groups.length; i++){
    var gr_ar = grouped_array[groups[i]];
    for(let j = 0; j < gr_ar.length; j++){
      sum_array[groups[i]] += Number(gr_ar[j]);
    }
  }
  // if use all select options
  var col_no = getColNames(table).indexOf(group);
  if(getDataType(table)[col_no] === "select-one"){
    var all_groups = getSelectOptionInCell(table.rows[1].cells[col_no].firstChild); 
    var ordered_sum_array = [];
    for(let i=0; i < all_groups.length; i++){
      if(sum_array[all_groups[i]] !== void 0){
        ordered_sum_array[[all_groups[i]]] = sum_array[all_groups[i]];
      }
    }
    var sum = ordered_sum_array;
  } else {
    var sum = sum_array;
  }
  sum = hash2table(sum);
  sum.setAttribute("id", id_result);
  // add th
  var tr = document.createElement('tr');
  tr.appendChild( crEl({ el: 'th', tc: group }) );
  tr.appendChild( crEl({ el: 'th', tc: array }) );
  // add as header
  sum.insertBefore(tr, sum.firstChild);
  return sum;
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

// Get data from occurrence table.
//    returns [array], [array], [array], 
//    Each array means a row in the table. 
//    
function getTableData(id_table){
// var id_table = "occurrence";
  const table = document.getElementById(id_table);
  const col_names = getColNames(table);
  const n_col = col_names.length;
  const n_row = table.rows.length;
  const data_types = getDataType(table);
  var table_data = [];
  // th
  var Rj = 0;
  var row_rj = table.rows[Rj].cells;
  var row_data = [];
  for(let Ci = 0; Ci < n_col; Ci++){
    row_data[Ci] = row_rj[Ci].innerHTML;
  }
  table_data[Rj] = row_data;
  // td
  for(let Rj=1; Rj<n_row; Rj++){
    var row_rj = table.rows[Rj].cells;
    var row_data = [];
    for(let Ci = 0; Ci < n_col; Ci++){
      row_data[Ci] = getCellData(row_rj[Ci], data_types[Ci]);
    }
    table_data[Rj] = row_data;
  }
  return table_data;
}

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

// Get options in select tag
//    Return string like "B1,B2,..." for select tag,
//    "" (vacant string) for pother input tag
function getSelectOption(table){
  const data_types = getDataType(table);
  const row_1 = table.rows[1].cells;  // table row except th (rows[0])
  var select_opt = [];
  for(let Ci = 0; Ci < data_types.length; Ci++){ select_opt[Ci] = ""; }
  for(let Ci = 0; Ci < data_types.length; Ci++){
    if(data_types[Ci] === "select-one"){
      opts = row_1[Ci].firstChild.children;
      for(opt of opts){ select_opt[Ci] = select_opt[Ci] + "," + opt.value; }
    }
  }
  return select_opt;
}

// Get data types from occurrence table.
//    Columns shown below are special, 
//        "date", "delButton", "no", "locLat", "locLon", "locAcc"
//        These columns can not be set by users. 
//    Other columns can be devided into 5 data types: 
//        "fixed", "checkbox", "text", "number", "select-one".
//    
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

function get_data_type(cell){
  return (cell.firstChild.type === void 0) ? "fixed" : cell.firstChild.type;
}
function get_data_types(table){
  var types = [];
  for(cell of table.rows[1].cells){ // 1: first td row
    types.push(get_data_type(cell));
  }
  return types;
}

function getColNames(table){
  // console.log(table.rows[0]);
  const row_0 = table.rows[0];
  const col_names = [];
  for(let Ri=0; Ri<row_0.cells.length; Ri++){
    col_names[Ri] = row_0.cells[Ri].innerText;
  //     col_names[Ri] = row_0.cells[Ri].innerHTML;
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
  //    const ms  = String(now.getMilliseconds()).padStart(3, `0`);
  //    return(`${yr}_${mo}_${dd}_${hh}_${mi}_${ss}_${ms}`)
   return(`${yr}_${mo}_${dd}_${hh}_${mi}_${ss}`)
}

// delete a row
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
//   
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

//    @paramas id_table  A string to specify a table.
//    @paramas type      A string to specify a data type, 
//                       which can be retrive by get_data_types() as shown below.
//                       "fixed", "text", "button", "checkbox", 'select-one','number'. 
//    @return  A string array.
//    @examples
//    var id_table = "occ_input_example_01";
//    var type = "number";
//    selectColByType(id_table, type);
//    var type = "select-one";
//    selectColByType(id_table, type);
function selectColByType(id_table, type){
  var table = document.getElementById(id_table);
  var types = get_data_types(table);
  var c_names = getColNames(table);
  var cols = [];
  for(let i = 0; i < types.length; i++){
    if(types[i] === type){ cols.push(c_names[i]); }
  }
  return cols;
}


function saveHTML(obj){
  var doc = document.documentElement.outerHTML;
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var blob = new Blob([bom, doc], { "type" : "text/tsv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = "biodiv.html"
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}
