function downloadStrings(strings, file_name){
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var blob = new Blob([bom, strings], { "type" : "text/tsv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = file_name;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}


function getInputTables(id_tab){
var id_tab = 'tab_inputs';
  var tab = document.getElementById(id_tab);
  var tables = tab.getElementsByTagName('table');
  // plot table
  var data_table = getTableDataPlus(tables[0].id, shift_one = true);
  for(var i = 1; i < tables.length; i++){   // occ tables
    data_table = data_table + getTableDataPlus(tables[i].id, shift_one = true);
  }
  data_table
}


// Get data and optional information from a table.
//    getTableDataPlus() retrieve table data as well as column names, data types, selects. 
//    @param id_table      A string to specify table id.
//    @param shift_one     A logical. If true, delete first element. (To delete hide_button)
//    @return               A string with 4 parts as shown below. 
//                          Each part is JSON format.
//                            c_names: Column names of table, which will be used for making th.
//                            d_types: Data types of each column for judging the td and input types.
//                            selects: Select options for 'list' element. null for other types.
//                            t_data : Table data for making td values or innnerHTML.
function getTableDataPlus(id_table, shift_one = false){
  // var id_table = "occ_input_table";
  var table = document.getElementById(id_table);
  var c_names = getColNames(table);
  var d_types = getDataTypes(table);
  var t_data = [];
  for(let name of c_names){
    t_data[name] = getColData(table, name);
    if(shift_one) t_data[name].shift();  // delete hide button
  }
  var selects = [];
  for(var i = 0; i < d_types.length; i++){ 
    selects.push( (d_types[i] === "list") ? getSelectOne(table, c_names[i]): null) 
  }
  var t_data = JSON.stringify(Object.assign({}, t_data));
  c_names = JSON.stringify({ biss_c_names: c_names });
  d_types = JSON.stringify({ biss_d_types: d_types });
  selects = JSON.stringify({ biss_selects: selects });
  return c_names + ";" + d_types + ";" + selects + ";" + t_data;
}

// Helper for getInputData()
//    @param table      A table element.
//    @param col_names  A string of column name to get options in select element.
//    @return            An array of select options.
function getSelectOne(table, col_name){
  // var col_name = "Layer";
  const col_no = getColNames(table).indexOf(col_name);
  var options = table.rows[2].cells[col_no].firstChild.options;
  var sel_opt = [];
  for(let option of options){
    sel_opt.push(option.innerText);
  }
  return sel_opt;
}


// Restore table from localStorage
//    Restore setting or input table data form localStorage. 
//    The data should be saved with saveTable() and genetated by getInputData().
//    The data has 4 parts as shown below. 
//      c_names: Column names of table, which will be used for making th.
//      d_types: Data types of each column for judging the td and input types.
//      selects: Select options for 'list' element. null for other types.
//      t_data : Table data for making td values or innnerHTML.
//    @param table_name  A string to specify table name. 
//                        localStorage key name is "bis_" + table_name.
//    @return             A table element with id: table_name.
//    @examples
//    var table_name = 'occ_input_table_example_01'; 
//    localStorage.setItem("bis_" + table_name, data.occ_input_table_example_01);
//    restoreTable(table_name);
function restoreTable(table_name, from = "localStorage"){
  // input data
  // console.log(table_name);
  // var table_name ="occ_input_table_example_01";
  // var from = "localStorage";
  switch(from){
    case "localStorage":
      var plot = localStorage[ "bis_" + table_name ].split(";")
      break;
    default:
      var plot = data[table_name].split(";");
      break;
  }
  var table = makeTable(plot, table_name);
  return table;
}

function makeTable(plot, table_name){
  // console.log(plot);
  var col_names = JSON.parse(plot[0])["biss_c_names"];
  var dat_types = JSON.parse(plot[1])["biss_d_types"];
  var selects   = JSON.parse(plot[2])["biss_selects"];
  var tab_data  = JSON.parse(plot[3]);
  // create table
  var table = crEl({ el: 'table', ats:{id: table_name} });

  // th
  const n_col = col_names.length;
  var hide_col = (table_name.split("_")[0] === "input");
  var tr = document.createElement('tr');
  for(let Ni = 0; Ni < n_col; Ni++){
    if(col_names[Ni] !== ""){
      var th = crEl({ el: 'th', ih: col_names[Ni] });
      tr.appendChild(th);
    }
  }
  table.appendChild(tr)

  // td: hide buttons
  if(hide_col){
      var tr = document.createElement('tr');
      for(let Ni = 0; Ni < n_col; Ni++){
        if(col_names[Ni] !== ""){
          var td = crEl({ el: 'td', ih: "" });
          td.appendChild( crEl({ el: 'input', ats:{type:"button", value:"Hide", onclick:"hideTableCol(this)"} }) ); 
          tr.appendChild(td);
        }
      }
      table.appendChild(tr)
  }


  // td
  const n_row = tab_data[col_names[0]].length;
  for(let Ri = 0; Ri < n_row; Ri++){
    var tr = document.createElement('tr');
    for(let Cj = 0; Cj < n_col; Cj++){
      tr.appendChild( restoreTd(tab_data[col_names[Cj]][Ri], dat_types[Cj], selects[Cj]) );
    }
    table.appendChild(tr);
  }
  return table;
}


// Helper for restoreTable()
//    @param table_data  A string to specify data in td.
//    @param data_type   A string to specify data type.
//    @param select      An array for select-option.
//    return              An td element with innerText or input element
function restoreTd(table_data, data_type, select){
  switch(data_type){
    case "text":
      var td = crEl({ el: "td" });
      td.appendChild( crEl({ el:'input', ats:{type: data_type, value: table_data} }) );
      break;
    case "number":
      var td = crEl({ el: "td" });
      td.appendChild(crEl({ el:'input', ats:{type: data_type, value: table_data, inputmode: "numeric", min: "0"} }));
      break;
    case "checkbox":
      var td = crEl({ el: "td" });
      var checkbox = crEl({ el:'input', ats:{type: data_type} });
  //       if(!!table_data) checkbox.setAttribute("checked", true);
      checkbox.checked = !!table_data;
      td.appendChild( checkbox );
      break;
    case "fixed":
      var td = crEl({ el:'td', ih: table_data });
      break;
    case "button":
      if(table_data === "DELETE")           { var td = createTdWithChild( createDelButton() ); }
      if(table_data === "UPDATE_TIME_GPS"){ var td = createTdWithChild( createUpdateButton() ); }
      break;
    case "list":
      var sel_no = select.indexOf(table_data);
      var td = createTdWithChild( createSelectOpt(select, sel_no) );
      break;
  }
  return td;
}
