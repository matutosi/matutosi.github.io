function createMakePlotButton(){
  return createInput({ type:"button", value: "Make plot table", onclick: "makePlotInputModule(this)" });
}
function createFileButton(){
  return createInput({ type: "file", accept: ".conf", onchange: "replaceTable(this)" });
}
function createSaveSettingButton(){
  return createInput({ type: "button", value: "Save settings", onclick: "saveSettings(this)" });
}
function createSaveInputButton(){
  return createInput({ type: "button", value: "Save inputs", onclick: "saveInputs(this)" });
}
function createShowColButton(c_name){
  return createInput({ type: "Button", value: c_name, onclick: "showCol(this)" });
}
function createSumButton(){
  return createInput({ type: "Button", value: "Calculate", onclick: "sumWithGroup(this)" });
}
function createSearchInput(){
  return createInput({ type:"text", onkeyup: "searchTableText(this)", placeholder: "Search text" });
}
function createNrowInput(){
  return createInput({ type: "number", value: "3", step: "1", min: "1", max:"20" });
}
function createAddRowButton(){
  return createInput({ type: "button", value: "Add row(s)", onclick: "addRows(this)" });
}
function createHideButton(){
  return createInput({ type: "button", value: "Hide table", onclick: "hideShowNext(this)" });
}
function createNewOccButton(){
  return createInput({ type: "button", value: "occ table", onclick: "makeNewOccTableModule(this)" });
}


function makeNewOccTableModule(obj){
  var table = makeNewOccTable(obj);
  if(table === null){ return void 0 ;}  // no table
  var module = inputTableModule(table.id, table = table);
  var tab_inputs = document.getElementById("tab_inputs");
  tab_inputs.appendChild(module);
  setSortable(table.id);
  obj.setAttribute("disabled", true)
}

function makePlotInputModule(obj){
  var table = makePlotTable(obj);
  var module = inputTableModule(table.id, table);
  var tab_inputs = document.getElementById("tab_inputs");
  tab_inputs.appendChild(module);
  setSortable(table.id);  // Should setSortable() after appendChild()
  tabs[1].click();        // move to tab_inputs
}

function makeNewOccTable(obj){
  // var obj = temp1;
  var tr = obj.parentElement.parentElement;
  var table = obj.parentElement.parentElement.parentElement;
  var c_no = getColNames(table).indexOf("Plot");
  var plot = tr.cells[c_no].firstChild.value;
  if(plot === ""){
    alert("Input Plot!");
    return null;
  }
  if(hasDupPlot(plot)){ return null;}
  // create new input table for occurrence and appendChild()
  var tab_settings = document.getElementById("tab_settings");
  var setting_table = tab_settings.querySelectorAll("table")[1];
  
  var table = makeOccTable(setting_table, plot);
  return table;
}

function hasDupPlot(plot){
  var tab_inputs = document.getElementById("tab_inputs");
  var input_tables = tab_inputs.querySelectorAll("table");
  for(table of input_tables){
    if(table.id.split("_")[1] === "occ"){
      if(table.id.split("_")[2] === plot){
        alert("Duplicated Plot!");
        return true;
      }
    }
  }
  return false;
}


function makeOccTable(setting_table, plot){
  var setting_c_names = getColNames(setting_table);
  var c_names = getColData(setting_table, setting_c_names[0]);
  var d_types = getColData(setting_table, setting_c_names[1]);
  var selects = getColData(setting_table, setting_c_names[2]);
  var id_table = setting_table.id.replace("setting", "input");
  var old_plot = id_table.split("_")[2];
  id_table = id_table.replace(old_plot, plot);

  var table = crEl({ el: 'table', ats: {id: id_table} });
  // th
  const n_col = c_names.length;
  var tr = document.createElement('tr');
  tr.appendChild( crEl({ el: 'th', ih: "Plot" }) );
  for(let Ni = 0; Ni < n_col; Ni++){
    if(c_names[Ni] !== ""){
      var th = crEl({ el: 'th', ih: c_names[Ni] });
      th.appendChild( crEl({ el: 'input', ats:{type:"button", value:"Hide", onclick:"hideTableCol(this)"} }) ); 
      tr.appendChild(th);
    }
  }
  table.appendChild(tr)
  // td
  var tr = document.createElement('tr');
  var td = crEl({ el: 'td' })
  tr.appendChild( crEl({ el: 'td', ih: plot }) );
  for(let i = 0; i < c_names.length; i++){
    if(setting_c_names[i] !== ""){
      var td = createInputTd(d_types[i], c_names[i], selects[i]);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}


function inputTableModule(ns, table = null){
  // var ns = "occ_input_table_example_01";
  var main   = crEl({ el:'span', id: "main_"   + ns});

  // Up span
  var up = crEl({ el:'span', ats:{id: "up_" + ns} });
  up.appendChild( crEl({ el: 'B', tc: ns}) );
  up.appendChild( createSearchInput() );

  up.appendChild( createSaveInputButton() );

  up.appendChild( createHideButton() );
  up.appendChild( crEl({ el: 'br' }) );
  up.appendChild( crEl({ el: 'span'}) );
  main.appendChild(up);

  // Table
  if(table === null){ var table = restoreTable(ns, ""); }

  // Down span
  var dn = crEl({ el:'span', ats:{id: "dn_" + ns} });
  dn.appendChild( createNrowInput() );
  dn.appendChild( createAddRowButton() );

  var occ = ns.split("_")[1] === "occ";
  if(occ){
    dn.appendChild( crEl({ el: 'br' }) );
    dn.appendChild( crEl({ el: 'span', tc: "Value: " }) );
    dn.appendChild( createSelectOpt( colByType(table, "number") ) );
    dn.appendChild( crEl({ el: 'span', tc: "; Group: " }) );
    dn.appendChild( createSelectOpt( colByType(table, "select-one") ) );
    dn.appendChild( createSumButton() );
  }

  main.appendChild(up);
  main.appendChild(table);
  main.appendChild(dn);
  main.appendChild( crEl({ el: 'hr' }) );

  return main;
}

function makePlotTable(obj){
  var setting_table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var setting_c_names = getColNames(setting_table);
  var c_names = getColData(setting_table, setting_c_names[0]);
  var d_types = getColData(setting_table, setting_c_names[1]);
  var selects = getColData(setting_table, setting_c_names[2]);
  var id_table = setting_table.id.replace("setting", "input");
  var table = crEl({ el: 'table', ats: {id: id_table} });
  // th
  const n_col = c_names.length;
  var tr = document.createElement('tr');
  var th = crEl({ el: 'th', ih: "New" });
  th.appendChild( crEl({ el: 'input', ats:{type:"button", value:"Hide", onclick:"hideTableCol(this)"} }) ); 
  tr.appendChild(th);
  for(let Ni = 0; Ni < n_col; Ni++){
    if(c_names[Ni] !== ""){
      var th = crEl({ el: 'th', ih: c_names[Ni] });
      th.appendChild( crEl({ el: 'input', ats:{type:"button", value:"Hide", onclick:"hideTableCol(this)"} }) ); 
      tr.appendChild(th);
    }
  }
  table.appendChild(tr)
  // td
  var tr = document.createElement('tr');
  var td = crEl({ el: 'td' })
  td.appendChild( createNewOccButton() );
  tr.appendChild( td );
  for(let i = 0; i < c_names.length; i++){
    if(setting_c_names[i] !== ""){
      var td = createInputTd(d_types[i], c_names[i], selects[i]);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

function settingTableModule(ns){
  // var ns = "occ_input_table_example_01";
  var main  = crEl({ el:'span', id: "main_"   + ns});

  // Up span
  var up = crEl({ el:'span', ats:{id: "up_" + ns} });
  up.appendChild( crEl({ el: 'B', tc: ns}) );
  up.appendChild( crEl({ el: 'br' }) );

  up.appendChild( crEl({ el: 'span', tc: "Load settings: " }) );
  up.appendChild( createFileButton() );

  up.appendChild( createInput({ type: "text", placeholder: "File name" }) );
  up.appendChild( createSaveSettingButton() );

  up.appendChild( createHideButton() );
  up.appendChild( crEl({ el: 'br' }) );
  up.appendChild( crEl({ el: 'span'}) );
  main.appendChild(up);

  // Table
  var table = restoreTable(ns, "");

  // Down span
  var dn = crEl({ el:'span', ats:{id: "dn_" + ns} });
  dn.appendChild( createNrowInput() );
  dn.appendChild( createAddRowButton() );

  var plot = (ns.split("_")[1] === 'plot');
  if(plot){ dn.appendChild( createMakePlotButton() );}  

  main.appendChild(up);
  main.appendChild(table);
  main.appendChild(dn);
  main.appendChild( crEl({ el: 'hr' }) );

  return main;
}


async function replaceTable(obj){
  var text = await readFile(obj.files[0]);
  var text = text.split(";");
  var table_name = obj.value.split("\\").slice(-1)[0].replace("\.conf", "")
  var new_table = makeTable(text, table_name, false);

  var old_table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  old_table.replaceWith(new_table);

  var old_title = obj.parentNode.parentNode.querySelectorAll("b")[0];
  var new_title = crEl({ el: 'B', tc: table_name})
  old_title.replaceWith( new_title );

}

  // https://www.delftstack.com/ja/howto/javascript/open-local-text-file-using-javascript/
function readFile(file){
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = x=> resolve(reader.result);
    reader.readAsText(file);
  })
}


function saveSettings(obj){
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var table_data = getTableDataPlus(table.id);
  var f_name = obj.previousElementSibling.value;
  if(f_name === ""){ 
    f_name = table.id + ".conf"; 
  } else {
    f_name = table.id.split("_")[0] + "_" + table.id.split("_")[1] + "_" + f_name  + ".conf";
  }
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var blob = new Blob([bom, table_data], { "type" : "text/tsv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = f_name
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  delete table_data;
}



function saveInputs(obj){
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var table_data = getTableDataPlus(table.id);
  var f_name = table.id + "_" + getNow() + ".txt"
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var blob = new Blob([bom, table_data], { "type" : "text/tsv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = f_name;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  delete table_data;
}


function showAllCols(obj){
  // console.log(obj.parentNode.parentNode.nextElementSibling);
  var table = obj.parentNode.parentNode.parentNode.querySelectorAll("table")[0];
  for(let Ci = 0; Ci < table.rows[0].cells.length; Ci++){
    for(let Rj = 0; Rj < table.rows.length; Rj++){
      table.rows[Rj].cells[Ci].style.display = '';
    }
  }
  obj.parentNode.textContent = "";
}


// Hide a column in a table.
function hideTableCol(obj){
  // console.log(obj.parentNode.parentNode.parentNode);
  var table = obj.parentNode.parentNode.parentNode.parentNode.querySelectorAll("table")[0];
  var c_name = obj.parentNode.innerText;
  // console.log(c_name);
  var c_no = getColNames(table).indexOf(c_name);
  for(let Rj = 0; Rj < table.rows.length; Rj++){
    table.rows[Rj].cells[c_no].style.display = 'none';
  }
  var span = obj.parentNode.parentNode.parentNode.previousElementSibling.lastElementChild;
  // tc: "Show "
  if(span.children.length === 0){
    span.textContent = "Show: ";
    span.appendChild( createInput({ type:"button", value:"All cols", onclick:"showAllCols(this)"}) );
  }
  span.appendChild( createShowColButton(c_name) );
}

function showCol(obj){
  // show col
  var c_name = obj.value;
  var table = obj.parentNode.parentNode.parentNode.querySelectorAll("table")[0];
  var c_no = getColNames(table).indexOf(c_name);
  for(let Rj = 0; Rj < table.rows.length; Rj++){
      table.rows[Rj].cells[c_no].style.display = '';
  }
  // remove
  if(obj.parentNode.children.length === 1){ obj.parentNode.textContent = ""; }
  obj.remove();
}


// Sum with group
function sumWithGroup(obj){
  var array = obj.previousElementSibling.previousElementSibling.previousElementSibling.value;
  var group = obj.previousElementSibling.value;
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var array_val = getColData(table, array);
  var group_val = getColData(table, group);
  var grouped_array = splitByGroup(array_val, group_val);
  // set groups by 'select-one' order
  var c_no = getColNames(table).indexOf(group);
  var opts = table.rows[1].cells[c_no].firstChild.options;
  var groups = [];
  for(o of opts){
    if(o.value !== ''){ groups.push(o.value); }
  }
  var sum_array = [];
  for(let i = 0; i < groups.length; i++){ sum_array[groups[i]] = 0; }
  for(let i = 0; i < groups.length; i++){
    var gr_ar = grouped_array[groups[i]];
    for(let j = 0; j < gr_ar.length; j++){
      sum_array[groups[i]] += Number(gr_ar[j]) * 10000;  // avoid dicimal error
    }
  }
  for(let i = 0; i < groups.length; i++){
    sum_array[groups[i]] = Math.round(sum_array[groups[i]]) / 10000;  // avoid dicimal error
  }
  sum = hash2table(sum_array);
  // add th
  var tr = document.createElement('tr');
  tr.appendChild( crEl({ el: 'th', tc: group }) );
  tr.appendChild( crEl({ el: 'th', tc: array }) );
  sum.insertBefore(tr, sum.firstChild);
  // Show sum
  if(obj.parentNode.lastElementChild === obj){
    obj.parentNode.appendChild(sum);
  } else {
    obj.parentNode.replaceChild(sum, obj.parentNode.lastElementChild);
  }
}


// Search text input tags in a table and show only matching rows
//    Clear input text, all rows will be shown.
//    Regular expression can be used.
//    @paramas obj  A input element.
//                  Normally use "this". 
function searchTableText(obj){
  // console.log(obj);
  // console.log(obj.value);
  // console.log(obj.parentNode.nextElementSibling);
  var input = obj.value;
  var reg_ex = new RegExp(input, 'i');  // i: case-insensitive
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var trs    = table.rows;
  var data_types = getDataType(table);
  var display_flag = [1];                // 1: show first row (th)
  for(let Rj = 1; Rj < trs.length; Rj++){ display_flag[Rj] = 0; }
  for(let Ci = 0; Ci < data_types.length; Ci++){
    if(data_types[Ci] === "text"){
      for(let Rj = 1; Rj < trs.length; Rj++){
        var text = trs[Rj].cells[Ci].firstChild.value;
        if(reg_ex.test(text)){ display_flag[Rj]++; }
      }
    }
  }
  for(let k = 1; k < display_flag.length; k++){
    if(display_flag[k] > 0) { trs[k].style.display = "";     }
    else                    { trs[k].style.display = "none"; }
    if(input === "")        { trs[k].style.display = "";     } // no input, show all
  }
}



// Helper to call addRow() multiple times
function addRows(obj){
  // console.log(obj);
  // console.log(obj.parentNode.previousElementSibling);
  var n_row = obj.previousElementSibling.value;
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  for(let i = 0; i < n_row; i++) addRow(table)
}

// Copy buttom row and paste it as new rows
//    Column date  getNow() will be applied.
//    Column fixed and <select> <option> will be used the same selection.
//    Column "checkbox" and "text" will be made in unchecked and blank.
//    
function addRow(table){
  // console.log(table);
  const col_names = getColNames(table);
  const n_col = col_names.length;
  const n_row = table.rows.length;
  var last_row = table.rows[n_row - 1];  // to get selectedIndex
  var next_row = table.rows[n_row - 1].cloneNode(true);
  for(let Ci = 0; Ci < n_col; Ci++){
    switch(col_names[Ci].toLowerCase()){
      case "new":  // Make bottun
        if(next_row.children[Ci].firstChild === null){
          next_row.children[Ci].appendChild( createNewOccButton() );
        } else {
          next_row.children[Ci].firstChild.replaceWith( createNewOccButton() );
        }
        break;
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



function hideShowNext(obj){
  // console.log(obj);
  // console.log(obj.parentNode.nextElementSibling);
  var span   = obj.nextElementSibling.nextElementSibling;
  var next   = obj.parentNode.nextElementSibling;
  var next_2 = obj.parentNode.nextElementSibling.nextElementSibling;
  if(next.style.display === 'none'){
    span.style.display = '';
    next.style.display = '';
    next_2.style.display = '';
    obj.value = "Hide table";
  } else {
    span.style.display = 'none';
    next.style.display = 'none';
    next_2.style.display = 'none';
    obj.value = "Show table";
  }
}

//    @paramas table  A table element.
//    @paramas type   A string to specify a data type, 
//                    which can be retrive by get_data_types() as shown below.
//                    "fixed", "text", "button", "checkbox", 'select-one','number'. 
//    @return  A string array.
//    @examples
function colByType(table, type){
  var types = get_data_types(table);
  var c_names = getColNames(table);
  var cols = [];
  for(let i = 0; i < types.length; i++){
    if(types[i] === type){ cols.push(c_names[i]); }
  }
  return cols;
}

function loadExample(obj){
  // console.log(obj.parentNode);

  // plot
  var make_plot_button = document.getElementById("dn_setting_plot_default").children[2];
  make_plot_button.click();
  var table = document.getElementById("input_plot_default");
  table.rows[1].cells[1].firstChild.value = "exam01";
  table.rows[1].cells[0].firstChild.click()

  // occ
  var main = obj.parentNode;
  var main = document.getElementById("tab_inputs");
  var occ_example = "input_occ_exam01";
  var new_module = inputTableModule(occ_example);
  main.children[4].replaceWith(new_module);
  setSortable(occ_example); // Can not set sortable in a function

  obj.nextElementSibling.remove(); // <br>
  obj.remove();
}
