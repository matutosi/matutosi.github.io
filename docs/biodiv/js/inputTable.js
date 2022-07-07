
function restoreInputPart(ns, id_table=""){
  var main = crEl({ el:'span' });
  var table_name = ns + "_input_table_" + id_table;
  // search
  var id = ns + "search_text";
  // console.log(ns);

  //   var onkeyup = "searchTable('" + table_name + "', this)";
  var onkeyup = "searchTableText(this)"; // for test

  main.appendChild( createInput({ type:"text", id: id, onkeyup: onkeyup, placeholder: "Search text input" }) );
  main.appendChild( createInput({ type:"button", value:"ShowCols", onclick:"showInputCols(this)"}) );

  //   table
  // console.log(table_name);
  var table = restoreTable(table_name, "");
  main.appendChild(table);
  setSortable(table_name);

  // add rows
  main.appendChild(createInputNrow(    table_name + "_n_row" ));
  main.appendChild(createButtonAddRow( table_name            ));  // input: table name to add rows

  // calc sum
  var onclick = "showSumByGroup('" + table_name + "', 'Cover', 'Layer', '" + table_name + "_calc_result')"; 
  main.appendChild( createInput({ type: "Button", value: "Calculate", onclick: onclick }) );
  var span = document.createElement('span');
  span.appendChild( crEl({ el: 'table', ats: {id: table_name + "_calc_result"} })); // table with no data
  main.appendChild(span);

  // hr
  main.appendChild( document.createElement('hr') );

  return main;
}

// TODO: Write documents
//    
function createInputPart(ns){
  var main = document.getElementById('tab_inputs');
  var table_name = ns + "_input_table";
  // search
  var id = ns + "search_text";
  // console.log(ns);
  var onkeyup = "searchTable('" + table_name + "', this)";
  main.appendChild( createInput({ type:"text", id: id, onkeyup: onkeyup,  placeholder: "Search text input" }) );

  //   table
  var table = createInputTable(ns);
  main.appendChild(table);
  setSortable(table_name);

  // add rows
  main.appendChild(createInputNrow(    table_name + "_n_row" ));
  main.appendChild(createButtonAddRow( table_name            ));  // input: table name to add rows

  // calc sum
  var onclick = "showSumByGroup('" + table_name + "', 'Cover', 'Layer', '" + table_name + "_calc_result')"; 
  main.appendChild( createInput({ type: "Button", value: "Calculate", onclick: onclick }) );
  var span = document.createElement('span');
  span.appendChild( crEl({ el: 'table', ats: {id: table_name + "_calc_result"} })); // table with no data
  main.appendChild(span);

  // hr
  main.appendChild( document.createElement('hr') );
}

// TODO: Write documents
//    
function createInputTable(ns){
  // console.log(id_span);
  // var id_span    = "input";
  // var id_setting = "meta_setting_table" ;
  // var id_table   = "meta_input_table";
  var setting_table = document.getElementById(ns + "_setting_table");
  var st_cnames = getColNames(setting_table);
  const col_names = getColData(setting_table, st_cnames[0]);
  const dat_types = getColData(setting_table, st_cnames[1]);
  const optionals = getColData(setting_table, st_cnames[2]);
  //   const optionals = getColData(table, col_names[3]);
  var id_table = ns + "_input_table";
  var table = crEl({ el: 'table',  ats: {id: id_table} })
  createTable(table, col_names); // add th

  var tr = document.createElement('tr');
  for(let i = 0; i < col_names.length; i++){
    if(col_names[i] !== ""){
      var td = createInputTd(dat_types[i], col_names[i], optionals[i]);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}


// TODO: write documents
//    
//    
function createInputTd(dat_type, col_name, optional){
  // console.log(dat_type);
  // console.log(col_name);
  // console.log(optional);
  var td = document.createElement('td');
  var col_name = col_name.toLowerCase();
  switch(dat_type){
    case "auto": // date, no, GPS
      if(col_name === "date")   td.innerHTML = getNow();
      if(col_name === "loclat") td.innerHTML = getLat();
      if(col_name === "loclon") td.innerHTML = getLon();
      if(col_name === "locacc") td.innerHTML = getAcc();
      if(col_name === "no")     td.innerHTML = 1;
      break;
    case "button": // delButton, update button
      if(col_name === "delbutton")   { td.appendChild( createDelButton() );     };
      if(col_name === "updatebutton"){ td.appendChild( createUpdateButton()  ); };
      break;
    case "fixed":
      if(optional === ""){ 
//        alert("Fixed columns should be input!");
        var optional = "NO INPUT";
      }
      td.innerHTML = optional;
      break;
    case "checkbox":
    case "text":
      td.appendChild(createInput({ type: dat_type }));
      break;
    case "number":
      td.appendChild(createInput({ type: dat_type, inputmode: "numeric", min: "0"} ));
      break;
    case "list":
      arry_list = optional.split(':').concat(Array(""));
      td.appendChild(createSelectOpt(arry_list, arry_list.length - 1));
      break;
  }
  return td;
}
// Update "Date", "locLat", "locLon", "locAcc"
//    When "Update" bottun clicked, update informations in the row.
//    @paramas obj Clicked row.
//    @return null.
function updateTimeGPS(obj){
  // settings
  var cols = ["Date", "locLat", "locLon", "locAcc"];
  var funs = [getNow, getLat, getLon, getAcc]
  // clicked things
  var table = obj.parentNode.parentNode.parentNode;
  var tr = obj.parentNode.parentNode;
  var row_no = tr.sectionRowIndex;
  // update
  for(let i = 0; i < cols.length; i++){
    var col_no = getColNames(table).indexOf(cols[i]);
    var cell = table.rows[row_no].cells[col_no];
    cell.replaceWith( crEl({ el:'td', ih: funs[i]() }) );
  }
}

// Create delete button
function createDelButton(){
  return createInput({ type: "button", value: "DELETE", onclick: "delRow(this)" });
}

// Create update time and GPS button
function createUpdateButton(){
  return createInput({ type: "button", value: "Update Time & GPS", onclick: "updateTimeGPS(this)" });
}

// Create (new) table
//   Create (new) table, but exactly not new. 
//   When id of exsiting table with no data and col item are given, 
//   createTable() add header to the table.
//   When table with header are given, return nothing and alert.
//   
function createTable(table, col_names){
  const n_row = table.rows.length;
  if(n_row != 0){
    alert("Can not create table, \n table already exists")
    return;
  }
  const n_col = col_names.length;
  var tr = document.createElement('tr');
  for(let Ni = 0; Ni < n_col; Ni++){
  //     if(col_names[Ni] !== "") tr.appendChild( crEl({ el: 'th', ih: col_names[Ni] }) );
    if(col_names[Ni] !== ""){
      var th = crEl({ el: 'th', ih: col_names[Ni] });
      th.appendChild( crEl({ el: 'input', ats:{type: "checkbox"} }) );
      tr.appendChild(th);
    }
  }
  table.appendChild(tr)  // return by side effiect
}


// Helper to call cloneRow() multiple times
function cloneRows(id_table){
  const n_row = document.getElementById(id_table + "_n_row").value;
  // console.log(n_row);
  for(let i=0; i<n_row; i++) cloneRow(id_table)
}

// Copy buttom row and paste it as new rows
//    id of each cell will be updated: "occ_date_001" -> "occ_date_002"
//    Column date  getNow() will be applied.
//    Column fixed and <select> <option> will be used the same selection.
//    Column "checkbox" and "text" will be made in unchecked and blank.
//    
function cloneRow(id_table){
// var id_table = "meta_input_table"
  var table = document.getElementById(id_table);
  const col_names = getColNames(table);
  const n_col = col_names.length;
  const n_row = table.rows.length;
  var last_row = table.rows[n_row - 1];  // to get selectedIndex
  var next_row = table.rows[n_row - 1].cloneNode(true);
  for(let Ci = 0; Ci < n_col; Ci++){
  // console.log(col_names[Ci].toLowerCase());
    switch(col_names[Ci].toLowerCase()){
      case "date":  // update "date"
        next_row.children[Ci].innerHTML = getNow();
        break;
      case "loclat":  // update GPS data
        next_row.children[Ci].innerHTML = getLat();
        break;
      case "loclon":
        next_row.children[Ci].innerHTML = getLon();
        break;
      case "locacc":
        next_row.children[Ci].innerHTML = getAcc();
        break;
      case "updatebutton": // do nothing
      case "delbutton":    // do nothing
        break;
      case "no":   // no = max(no) + 1
        var nos = getColData(table, col_names[Ci]);
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

// Get Hidden column names in a table.
//   Not used yet in code for showing column. 
//     Should be worked with showInputCols() and hideInputCol(). 
//     Have no idea to code this.s
function hiddenInputCols(table){
  // var table = document.getElementById("occ_input_table_example_01");
  var row_0 = table.rows[0];
  var hidden_cols = [];
  for(let Ci = 0; Ci < row_0.cells.length; Ci++){
    if(row_0.cells[Ci].style.display === 'none'){ hided_cols.push(row_0.cells[Ci].innerText) ;}
  }
  return hidden_cols;
}

// Show columns in a table.
//    Should be set button as shon below, 
//      <input type="button" value="ShowCols" onclick="showInputCols(this)">
//    Can be generated by folowing code.
//      createInput({ type:"button", value:"ShowCols", onclick:"showInputCols(this)"})
//    The button should be put JUST BEFORE the table.
//    @paramas obj input button.
//      which can be specified by obj.nextElementSibling.
function showInputCols(obj){
  var table = obj.nextElementSibling;
  for(let Ci = 0; Ci < table.rows[0].cells.length; Ci++){
    for(let Rj = 0; Rj < table.rows.length; Rj++){
      table.rows[Rj].cells[Ci].style.display = '';
    }
  }
}

// Hide a column in a table.
//    hideInputCol() can only hide a column, use showInputCols() to show hidden columns again.
//    Should be set button in each th as shon below, 
//      <input type="button" value="Hide col" onclick="hideInputCol(this)">
//    Can be generated by folowing code.
//      crEl({ el: 'input', ats:{type: "button", value: "Hide col", onclick: "hideInputCol(this)"} })
//    The button should be put in th (table header).
//    @paramas obj input button.
function hideInputCol(obj){
  var table = obj.parentNode.parentNode.parentNode;
  var c_name = obj.parentNode.innerText;
  var c_no = getColNames(table).indexOf(c_name);
  for(let Rj = 0; Rj < table.rows.length; Rj++){
    table.rows[Rj].cells[c_no].style.display = 'none';
  }
}
