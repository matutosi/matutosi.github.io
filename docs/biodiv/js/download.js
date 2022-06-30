// https://phper.pro/352

function getInputData(id_table){
  // var id_table = "occ_input_table";
  var table = document.getElementById(id_table);
  var c_names = getColNames(table);
  var d_types = get_data_types(table);
  var t_data = [];
  for(name of c_names){
    t_data[name] = getColData(table, name);
  }
  var selects = [];
  for(var i = 0; i < d_types.length; i++){ selects.push( (d_types[i] === "select-one") ? getSelectOne(table, c_names[i]): null) };

  var json = JSON.stringify(Object.assign({}, t_data));
  c_names = JSON.stringify({ sys_c_names: c_names });
  d_types = JSON.stringify({ sys_d_types: d_types });
  selects = JSON.stringify({ sys_selects: selects });
  return c_names + ";" + d_types + ";" + selects + ";" + json;
}


function getSelectOne(table, col_name){
var col_name = "Layer";
  const col_no = getColNames(table).indexOf(col_name);
  var options = table.rows[1].cells[col_no].firstChild.options;
  var sel_opt = [];
  for(option of options){
    sel_opt.push(option.innerText);
  }
  return sel_opt;
}





function download(id){
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var table = document.getElementById(id);
  var data_tsv = "";                             // data_tsv is data holder

  for(var i = 0;  i < table.rows.length; i++) {
    for(var j = 0; j < table.rows[i].cells.length; j++) {
      data_tsv += table.rows[i].cells[j].innerText;           // save data in cellls
      if(j == table.rows[i].cells.length-1) data_tsv += "\n";  // add line break
      else data_tsv += "\t";                                   // add "\t" as separater
    }
  }

  var blob = new Blob([ bom, data_tsv], { "type" : "text/tsv" });  // download tsv data from data_tsv
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = getNow() + ".tsv";
  a.href = url;
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
  delete data_tsv;
}
