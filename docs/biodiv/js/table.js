function createTd(col_name, data_type, select, table_data){
  switch(data_type){
    case "auto": // date, no, GPS
      if(col_name === "DATE"  )  td = crEl({ el: 'td', ih: getNow() });
      if(col_name === "LOC_LAT") td = crEl({ el: 'td', ih: getLat() });
      if(col_name === "LOC_LON") td = crEl({ el: 'td', ih: getLon() });
      if(col_name === "LOC_ACC") td = crEl({ el: 'td', ih: getAcc() });
      if(col_name === "NO"    ) td = crEl({ el: 'td', ih: 1        });
      break;
    case "text":
      var td = createTdWithChild( crEl({ el:'input', ats:{type: data_type, value: table_data} }) );
      break;
    case "number":
      var td = createTdWithChild( 
        crEl({ el:'input', ats:{type: data_type, value: table_data, inputmode: "numeric", min: "0"} }) );
      break;
    case "checkbox":
      var td = createTdWithChild( crEl({ el:'input', ats:{type: data_type, checked: !!table_data} }) );
      break;
    case "fixed":
      if(table_data === ""){ table_data = "NO_INPUT"; }   // alert("Fixed columns should be input!");
      var td = crEl({ el:'td', ih: table_data });
      break;
    case "button":
      if(col_name === "DELETE")         { var td = createTdWithChild( createDelButton() ); }
      if(col_name === "UPDATE_TIME_GPS"){ var td = createTdWithChild( createUpdateButton() ); }
      break;
    case "list":
      if(select.indexOf(table_data) === -1){ var selected_no = 0;                          }
      else                                 { var selected_no = select.indexOf(table_data); }
      var td = createTdWithChild( createSelectOpt(select, selected_no) );
      break;
  }
  return td;
}

function addThTr(table, col_names){
  var tr = document.createElement('tr');
  for(let Ni = 0; Ni < col_names.length; Ni++){
    if(col_names[Ni] !== ""){
      var th = crEl({ el: 'th', ih: col_names[Ni] });
      tr.appendChild(th);
    }
  }
  table.appendChild(tr);
  return table;
}

function nRow(table){
  return table.rows.length;
}
function nCol(table){
  return table.rows[0].cells.length;
}

function addHideRowTr(table){
  var tr = crEl({ el: 'tr', ats: {class: 'hide_button'} });
  for(let i = 0; i < nCol(table); i++){
    var td = crEl({ el: 'td', ih: "" });
    td.appendChild( createHideTableColButton() );
    tr.appendChild(td);
  }
  table.appendChild(tr)
  return table;
}
function createHideTableColButton(){
  return createInput({ type:"button", value: "Hide", onclick: "hideTableCol(this)" });
}

// Helper to create input with select options
//    when selected_no is given, 
//    its <option> (start with 0) will be set as "selected".
function createSelectOpt(list, selected_no = 0){
  const n_list = list.length;
  var select = document.createElement('select');
  for(let j = 0; j < n_list; j++){
    var option = document.createElement('option');
    if(selected_no === j){ option.setAttribute('selected', 'true'); }
    option.innerHTML = list[j];
    select.appendChild(option);
  }
  return select;
}


// Get data and optional information from a table.
//    getTableDataPlus() retrieve table data as well as column names, data types, selects. 
//    @param id_table      A string to specify table id.
//    @return               A string with 4 parts as shown below. 
//                          Each part is JSON format.
//                            c_names: Column names of table, which will be used for making th.
//                            d_types: Data types of each column for judging the td and input types.
//                            selects: Select options for 'list' element. null for other types.
//                            t_data : Table data for making td values or innnerHTML.
function getTableData(table){
var table = document.getElementById("setting_occ_default");
  var c_names = getColNames(table);
  var d_types = getDataTypes(table);
  // getInputs
  var t_data = [];
  for(let name of c_names){
    t_data[name] = getColData(table, name);
  }
  var selects = [];
  for(var i = 0; i < d_types.length; i++){ 
    selects.push( (d_types[i] === "list") ? getSelectOne(table, c_names[i]): '');
  }
  return{
    biss_c_names: c_names,
    biss_d_types: d_types,
    biss_selects: selects,
    biss_inputs: t_data
  }
}

//   @param 
//   @param 
//   @return  A table
function makeTableJson(table_data_json, table_name){
  // data for test
  //   var col_names = data_00[table_name]["biss_c_names"];
  //   var dat_types = data_00[table_name]["biss_d_types"];
  //   var selects   = data_00[table_name]["biss_selects"];
  //   var tab_data  = data_00[table_name]["biss_inputs"];
  var col_names = table_data_json["biss_c_names"];
  var dat_types = table_data_json["biss_d_types"];
  var selects   = table_data_json["biss_selects"];
  var tab_data  = table_data_json["biss_inputs"];

  var table = crEl({ el: 'table', ats:{id: table_name} });
  var table = addThTr(table, col_names);                                    // tr with th (col names)
  var table = addHideRowTr(table);                                          // tr with hide buttons
  var table = addTableData(table, col_names, dat_types, selects, tab_data); // table data
  return table;
}

function addTableData(table, col_names, dat_types, selects, tab_data){
  for(let Ri = 0; Ri < tab_data[col_names[0]].length; Ri++){
    var tr = document.createElement('tr');
    for(let Cj = 0; Cj < nCol(table); Cj++){
      if(col_names[Cj] !== ""){
        tr.appendChild( createTd(col_names[Cj], dat_types[Cj], selects[Cj], tab_data[col_names[Cj]][Ri]) );
      }
    }
    table.appendChild(tr);
  }
  return table;
}

function convertTableData(table_data){
  var c_names = table_data['biss_inputs']['item'];
  var d_types = table_data['biss_inputs']['type'];
  var selects = [];
  var inputs  = [];
  for(var i = 0; i < d_types.length; i++){
    selects.push( (d_types[i] === 'list' ) ? table_data['biss_inputs']['value'][i].split(':') : '' );
    inputs[c_names[i]] = [(d_types[i] === 'fixed') ? table_data['biss_inputs']['value'][i]: ''];
  }
  return {
    biss_c_names: c_names,
    biss_d_types: d_types,
    biss_selects: selects,
    biss_inputs : inputs 
  }
}

  // editing now
var table_name = "setting_occ_default";
  // var table_name = "input_plot_default";
  // var table_name = "setting_plot_01";
var table = document.getElementById(table_name);
var table_data = getTableData(table);
var t_data = convertTableData(table_data);
var table_new = makeTableJson(t_data, "test")
document.getElementById("setting_occ_default").replaceWith(table_new);




var table_name = "setting_plot_01";
var table_data_json = data_00[table_name];
var table = makeTableJson(table_data_json, table_name);
table;
var table_new = makeTableJson(table_data_json, table_name);
document.getElementById("setting_occ_default").replaceWith(table_new);

  // data_00["setting_plot_01"]["biss_inputs"]["item"]
  // JSON.stringify(data_00)
  // JSON.parse(JSON.stringify(data_00))

  // Not yet used
function addRow(table){
  // console.log(table);
  const col_names = getColNames(table);
  const n_col = col_names.length;
  const n_row = table.rows.length;
  var last_row = table.rows[n_row - 1];  // to get selectedIndex
  var next_row = table.rows[n_row - 1].cloneNode(true);
  for(let Ci = 0; Ci < n_col; Ci++){
  //     switch(col_names[Ci].toLowerCase()){  // // toLowerCase  // // 
    switch(col_names[Ci]){  // // toLowerCase  // // 
      case "Make":  // Make bottun
        if(next_row.children[Ci].firstChild === null){
          next_row.children[Ci].appendChild( createNewOccButton() );
        } else {
          next_row.children[Ci].firstChild.replaceWith( createNewOccButton() );
        }
        break;
      case "DATE":  // update "DATE"
        next_row.children[Ci].innerHTML = getNow();
        break;
      case "LOC_LAT":  // update GPS data
        next_row.children[Ci].innerHTML = getLat();
        break;
      case "LOC_LON":
        next_row.children[Ci].innerHTML = getLon();
        break;
      case "LOC_ACC":
        next_row.children[Ci].innerHTML = getAcc();
        break;
      case "UPDATE_TIME_GPS": // do nothing
      case "DELETE":       // do nothing
        break;
      case "NO":   // no = max(no) + 1
        var nos = getColData(table, col_names[Ci]);
        nos.shift(); // delete "hide button"
        next_row.children[Ci].innerHTML = Math.max.apply(Math, string2Numeric(nos)) + 1;
        break;
      default:
        if(next_row.children[Ci].firstChild.value === void 0){  
          // void 0 means undifined -> fixed text: do nothing
          break;
        } else {
          switch(next_row.children[Ci].firstChild.getAttribute("type")){
            case "checkbox": // clear checkbox
              next_row.children[Ci].firstChild.checked = false;
              break;
            case "text":    // clear input text
            case "number":  // clear input text
              next_row.children[Ci].firstChild.value = "";
              break;
            case null: // select from list
              selected_opt = last_row.children[Ci].firstChild.selectedIndex;
              next_row.children[Ci].firstChild.selectedIndex = selected_opt;
              break;
          }
        }
        break;
    }
  }
  table.appendChild(next_row);
}
