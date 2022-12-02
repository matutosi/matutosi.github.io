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


// Get data and optional information from a table.
//    getTableDataPlus() retrieve table data as well as column names, data types, selects. 
//    @param table      A table.
//    @return              A JavaScript Object.
//                            c_names: Column names of table, which will be used for making th.
//                            d_types: Data types of each column for judging the td and input types.
//                            selects: Select options for 'list' element. null for other types.
//                            inputs : Table data for making td values or innnerHTML.
function getTableDataPlus(table){
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

