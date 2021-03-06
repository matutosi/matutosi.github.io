// Get data and optional information from a table.
//    getTableDataPlus() retrieve table data as well as column names, data types, selects. 
//    @params id_table      A string to specify table id.
//    @return               A string with 4 parts as shown below. 
//                          Each part is JSON format.
//                            c_names: Column names of table, which will be used for making th.
//                            d_types: Data types of each column for judging the td and input types.
//                            selects: Select options for 'select-one' element. null for other types.
//                            t_data : Table data for making td values or innnerHTML.
function getTableDataPlus(id_table){
  // var id_table = "occ_input_table";
  var table = document.getElementById(id_table);
  var c_names = getColNames(table);
  var d_types = get_data_types(table);
  var t_data = [];
  for(name of c_names){
    t_data[name] = getColData(table, name);
  }
  var selects = [];
  for(var i = 0; i < d_types.length; i++){ 
    selects.push( (d_types[i] === "select-one") ? getSelectOne(table, c_names[i]): null) 
  };
  var t_data = JSON.stringify(Object.assign({}, t_data));
  c_names = JSON.stringify({ sys_c_names: c_names });
  d_types = JSON.stringify({ sys_d_types: d_types });
  selects = JSON.stringify({ sys_selects: selects });
  return c_names + ";" + d_types + ";" + selects + ";" + t_data;
}

// Helper for getInputData()
//    @params table      A table element.
//    @params col_names  A string of column name to get options in select element.
//    @return            An array of select options.
function getSelectOne(table, col_name){
  // var col_name = "Layer";
  const col_no = getColNames(table).indexOf(col_name);
  var options = table.rows[1].cells[col_no].firstChild.options;
  var sel_opt = [];
  for(option of options){
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
//      selects: Select options for 'select-one' element. null for other types.
//      t_data : Table data for making td values or innnerHTML.
//    @params table_name  A string to specify table name. 
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
  var col_names = JSON.parse(plot[0])["sys_c_names"];
  var dat_types = JSON.parse(plot[1])["sys_d_types"];
  var selects   = JSON.parse(plot[2])["sys_selects"];
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
      if(hide_col){ th.appendChild( crEl({ el: 'input', ats:{type:"button", value:"Hide", onclick:"hideTableCol(this)"} }) ); }
      tr.appendChild(th);
    }
  }
  table.appendChild(tr)
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
//    @params table_data  A string to specify data in td.
//    @params data_type   A string to specify data type.
//    @params select      An array for select-option.
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
      if(table_data) checkbox.setAttribute("checked", true);
      td.appendChild( checkbox );
      break;
    case "fixed":
      var td = crEl({ el:'td', ih: table_data });
      break;
    case "button":
      if(table_data === "DELETE")           { var td = createTdWithChild( createDelButton() ); }
      if(table_data === "Update Time & GPS"){ var td = createTdWithChild( createUpdateButton() ); }
      break;
    case "select-one":
      var sel_no = select.indexOf(table_data);
      var td = createTdWithChild( createSelectOpt(select, sel_no) );
      break;
  }
  return td;
}
