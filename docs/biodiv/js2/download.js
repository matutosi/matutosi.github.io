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
  var data_table = getTableDataPlus(tables[0].id);
  for(var i = 1; i < tables.length; i++){   // occ tables
    data_table = data_table + getTableDataPlus(tables[i].id);
  }
  data_table
}


// Get data and optional information from a table.
//    getTableDataPlus() retrieve table data as well as column names, data types, selects. 
//    @param id_table      A string to specify table id.
//    @return              A JavaScript Object.
//                            c_names: Column names of table, which will be used for making th.
//                            d_types: Data types of each column for judging the td and input types.
//                            selects: Select options for 'list' element. null for other types.
//                            inputs : Table data for making td values or innnerHTML.
function getTableDataPlus(id_table){
  // var id_table = "occ_input_table";
  var table   = document.getElementById(id_table);
  var c_names = getColNames(table);
  var d_types = getDataTypes(table);
  var inputs  = [];
  for(let name of c_names){
    inputs[name] = getColData(table, name);
  }
  var inputs = Object.assign({}, inputs)
  var selects = [];
  for(var i = 0; i < d_types.length; i++){ 
    selects.push( (d_types[i] === "list") ? getSelectOne(table, c_names[i]): null) 
  }
  var biss_data = { biss_c_names: c_names,
                    biss_d_types: d_types,
                    biss_selects: selects,
                    biss_inputs : inputs  };
  return biss_data;
  //   var inputs  = JSON.stringify();
  //   var c_names = JSON.stringify({ biss_c_names: c_names });
  //   var d_types = JSON.stringify({ biss_d_types: d_types });
  //   var selects = JSON.stringify({ biss_selects: selects });
  //   return c_names + ";" + d_types + ";" + selects + ";" + inputs;
}

// Helper for getInputData()
//    @param table      A table element.
//    @param c_names  A string of column name to get options in select element.
//    @return            An array of select options.
function getSelectOne(table, col_name){
  // var col_name = "Layer";
  const col_no = getColNames(table).indexOf(col_name);
  if(col_no < 0){ return []; }  // no col_name
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
//      inputs : Table data for making td values or innnerHTML.
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
  var c_names = JSON.parse(plot[0])["biss_c_names"];
  var d_types = JSON.parse(plot[1])["biss_d_types"];
  var selects   = JSON.parse(plot[2])["biss_selects"];
  var inputs  = JSON.parse(plot[3]);
  // create table
  var table = crEl({ el: 'table', ats:{id: table_name} });

  // th
  const n_col = c_names.length;
  var hide_col = (table_name.split("_")[0] === "input");
  var tr = document.createElement('tr');
  for(let Ni = 0; Ni < n_col; Ni++){
    if(c_names[Ni] !== ""){
      var th = crEl({ el: 'th', ih: c_names[Ni] });
      tr.appendChild(th);
    }
  }
  table.appendChild(tr)

  // td: hide buttons
  if(hide_col){
      var tr = document.createElement('tr');
      for(let Ni = 0; Ni < n_col; Ni++){
        if(c_names[Ni] !== ""){
          var td = crEl({ el: 'td', ih: "" });
          td.appendChild( crEl({ el: 'input', ats:{type:"button", value:"Hide", onclick:"hideTableCol(this)"} }) ); 
          tr.appendChild(td);
        }
      }
      table.appendChild(tr)
  }


  // td
  const n_row = inputs[c_names[0]].length;
  for(let Ri = 0; Ri < n_row; Ri++){
    var tr = document.createElement('tr');
    for(let Cj = 0; Cj < n_col; Cj++){
      tr.appendChild( restoreTd(inputs[c_names[Cj]][Ri], d_types[Cj], selects[Cj]) );
    }
    table.appendChild(tr);
  }
  return table;
}


// Helper for restoreTable()
//    @param inputs   A string to specify data in td.
//    @param d_types  A string to specify data type.
//    @param select   An array for select-option.
//    return          An td element with innerText or input element
function restoreTd(inputs, d_types, select){
  switch(d_types){
    case "text":
      var td = crEl({ el: "td" });
      td.appendChild( crEl({ el:'input', ats:{type: d_types, value: inputs} }) );
      break;
    case "number":
      var td = crEl({ el: "td" });
      td.appendChild(crEl({ el:'input', ats:{type: d_types, value: inputs, inputmode: "numeric", min: "0"} }));
      break;
    case "checkbox":
      var td = crEl({ el: "td" });
      var checkbox = crEl({ el:'input', ats:{type: d_types} });
  //       if(!!inputs) checkbox.setAttribute("checked", true);
      checkbox.checked = !!inputs;
      td.appendChild( checkbox );
      break;
    case "fixed":
      var td = crEl({ el:'td', ih: inputs });
      break;
    case "button":
      if(inputs === "DELETE"         ){ var td = createTdWithChild( createDelButton() ); }
      if(inputs === "UPDATE_TIME_GPS"){ var td = createTdWithChild( createUpdateButton() ); }
      break;
    case "list":
      var sel_no = select.indexOf(inputs);
      var td = createTdWithChild( createSelectOpt(select, sel_no) );
      break;
  }
  return td;
}
