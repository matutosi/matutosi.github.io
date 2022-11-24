// 
// 
// 
// 
function addSettingPart(category, obj){
  //   console.log(category);   //  "plot" or "occ"
  //   console.log(obj.value);  //  items to add
  //   var obj = temp1; obj  var obj = temp1; obj.parentNode.nextSibling.nextSibling.nextSibling;
  var table_category = "_" + category + "_tb";
  var table = document.getElementById('tab_settings').querySelector("table[id$='" + table_category + "']");
  var values = data_settings_part[category][obj.value];

  var keys = Object.keys(values);
  var n = values[keys[0]].length;

  for(let i = 0; i < n; i++){
    var json = '{';
    for(let key of keys){
      var json = json + '"' + key + '":"' + values[key][i] + '",';
    }
    var json = json.slice(0, -1) + '}';
  // console.log( table );
  // console.log( JSON.parse(json) );
    addRowWithValues({ table: table, values: JSON.parse(json) });
  }
}

function addSettingPartButton(category){
  var keys = Object.keys(data_settings_part[category]);
  var main = crEl({ el:'span'});
  main.appendChild( crEl({ el: 'span', ih: 'Add items to <b>' + category + '</b>: ' }) );
  for(let key of keys){
    var input = crEl({ el:'input', ats:{ type:'button', value: key, onclick: 'addSettingPart("' + category + '", this)'} });
    main.appendChild(input);
  }
  main.appendChild( crEl({ 'el': 'br' }) );
  return main;
}

function createSettingSelect(){
  var main = crEl({ el:'span' });
  main.appendChild( crEl({ el: 'span', ih: 'Choose <b>main</b> setting: ' }) );
  var settings = Object.keys(data_settings);
  var selects = createSelectOpt(settings);
  selects.setAttribute('onChange', 'changeSettings(this)');
  main.appendChild(selects);
  main.appendChild( crEl({ 'el': 'br' }) );
  return main;
}

function changeSettings(obj){
  var setting = obj.value;
  var plot_module = tableModule({ table_data: data_settings[setting].plot, ns: setting + '_plot',
                                  id_text: true, load_button: true, save_button: true, hide_button: true, 
                                  add_button: true });
  var next = obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
  next.replaceWith(plot_module);
  var occ_module = tableModule({ table_data: data_settings[setting].occ, ns: setting + '_occ',
                                  id_text: true, load_button: true, save_button: true, hide_button: true, 
                                  add_button: true });
  plot_module.nextSibling.replaceWith(occ_module);

  setSortable(setting + '_plot_tb');
  setSortable(setting + '_occ_tb');

}

// Create table module
//   In a module has a table and other input elements, 
//   which operate the table.
// @paramas table_data    
// @paramas ns            A string to specify input table module.
// @retrun  A span including a table and other elements.
function tableModule({ table_data, ns, 
                       id_text, search_input, load_button, save_button, hide_button, fit_button, 
                       add_button, calc_button }){
  var main  = crEl({ el:'span', ats:{id: ns} });
  // Up span
  var up = crEl({ el:'span', ats:{id: ns + "_up"} });
  if(id_text      != void 0){   up.appendChild( crEl({ el: 'B', tc: ns}) ); 
                                up.appendChild( crEl({ el: 'br' }) );
  }
  if(load_button  != void 0){   up.appendChild( crEl({ el: 'span', ih: "<b>Load: </b>" }) );
                                up.appendChild( createFileButton() );
  }
                              //     up.appendChild( crEl({ el: 'br' }) );
  if(save_button  != void 0){   up.appendChild( createSaveButton() );
                                up.appendChild( createInput({ type: "text", placeholder: "File name" }) );
                                up.appendChild( crEl({ el: 'br' }) );
  }
  if(search_input != void 0)    up.appendChild( createSearchInput() );
  if(hide_button  != void 0)    up.appendChild( createHideButton() );
  if(fit_button   != void 0)    up.appendChild( createFitTable( ns + '_fit' ) ); 

  up.appendChild( crEl({ el: 'br'  }) );
  up.appendChild( crEl({ el: 'span'}) ); // for show button

  // Table
  var table = makeTableJO(table_data, ns + "_tb");

  // Down span
  var dn = crEl({ el:'span', ats:{id: ns + "_dn"} });
  if(add_button  != void 0){    dn.appendChild( createNrowInput( ns + '_nrow') );
                                dn.appendChild( createAddRowButton( ns + '_add_rows') );
  }
  if(calc_button != void 0){    dn.appendChild( crEl({ el: 'br' }) );
                                dn.appendChild( crEl({ el: 'span', ih: "<b>Value: </b>" }) );
                                dn.appendChild( createSelectOpt( colByType(table, "number") ) );
                                dn.appendChild( crEl({ el: 'span', ih: "; <b>Group: </b>" }) );
                                dn.appendChild( createSelectOpt( colByType(table, "list") ) );
                                dn.appendChild( createSumButton() );
  }

  main.appendChild(up);
  main.appendChild(table);
  main.appendChild(dn);
  main.appendChild( crEl({ el: 'hr' }) );

  return main;
}


// Create occurrence table module
//   @paramas obj  A input element.
//                 Normally use "this". 
//   @retrun  A span including a table and other elements.
function makeNewOccTableModule(obj){
  var table = makeNewOccTable(obj);
  if(table === null){ return void 0 ;}  // no table
  var module = inputTableModule(table.id, table = table);
  var tab_inputs = document.getElementById("tab_inputs");
  tab_inputs.appendChild(module);
  setSortable(table.id);
  obj.setAttribute("disabled", true)
}

// Helper for makeNewOccTableModule()
//   @paramas obj  A input element.
//                 Normally use "this". 
//   @retrun  A table element.
function makeNewOccTable(obj){
  // var obj = temp1;
  var tr = obj.parentElement.parentElement;
  var table = obj.parentElement.parentElement.parentElement;
  var c_no = getColNames(table).indexOf("PLOT");
  var plot = tr.cells[c_no].firstChild.value;
  if(plot === ""){
    alert("Input PLOT!");
    return null;
  }
  if(hasDupPlot(plot)){ return null;}
  // create new input table for occurrence and appendChild()
  var tab_settings = document.getElementById("tab_settings");
  var setting_table = tab_settings.querySelectorAll("table")[1];
  var table = makeOccTable(setting_table, plot);
  return table;
}

// Make plot input module
//   @paramas obj  A input element.
//                 Normally use "this". 
//   @retrun  A plot input module and change input tab.
function makePlotInputModule(obj){
  var table = makePlotTable(obj);
  var module = inputTableModule(table.id, table);
  var tab_inputs = document.getElementById("tab_inputs");
  tab_inputs.appendChild(module);
  setSortable(table.id);  // Should setSortable() after appendChild()
  shortTable(table.previousElementSibling.children[3])  // Short table
  tabs[1].click();        // move to tab_inputs
}


// Helper for makeOccTable() and makePlotTable()
//   td is basic element, createInputTd() create 
//   from data type, column name, and  optional.
//   @paramas dat_type  A string to specify data type.
//   @paramas col_name  A string to specify column name.
//   @paramas optional  A string to specify optional.
//   @return  A td element
function createInputTd(dat_type, col_name, optional){
  // console.log(dat_type);
  // console.log(col_name);
  // console.log(optional);
  var td = document.createElement('td');
  //   var col_name = col_name.toLowerCase();
  switch(dat_type){
    case "auto": // date, no, GPS
      if(col_name === "DATE")   td.innerHTML = getNow();
      if(col_name === "LOC_LAT") td.innerHTML = getLat();
      if(col_name === "LOC_LON") td.innerHTML = getLon();
      if(col_name === "LOC_ACC") td.innerHTML = getAcc();
      if(col_name === "NO")     td.innerHTML = 1;
      break;
    case "button": // DELETE, update button
      if(col_name === "DELETE")   { td.appendChild( createDelButton() );    };
      if(col_name === "UPDATE_TIME_GPS"){ td.appendChild( createUpdateButton() ); };
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

// DONE: update date GPS

// Update "DATE", "LOC_LAT", "LOC_LON", "LOC_ACC"
//    When "Update" bottun clicked, update informations in the row.
//    @paramas obj Clicked row.
//    @return null.
function updateTimeGPS(obj){
  // settings
  // var obj = temp1;
  var cols = ["DATE", "LOC_LAT", "LOC_LON", "LOC_ACC"];
  var funs = [getNow, getLat, getLon, getAcc]
  var table = searchParentTable(obj);
  var tr = obj.parentNode.parentNode;
  var row_no = tr.sectionRowIndex;
  // update
  for(let i = 0; i < cols.length; i++){
    var col_no = getColNames(table).indexOf(cols[i]);
    var cell = table.rows[row_no].cells[col_no];
    cell.innerHTML = funs[i]();
  }
}

// DONE: 

// Sum numeric with groups.
//     In BISS, number input is the subject to sum, 
//     list input is the options to group.
//   @paramas obj  A input element.
//                 Normally use "this". 
function sumWithGroup(obj){
  var array = obj.previousElementSibling.previousElementSibling.previousElementSibling.value;
  var group = obj.previousElementSibling.value;
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var array_val = getColData(table, array);
  var group_val = getColData(table, group);
  var grouped_array = splitByGroup(array_val, group_val);
  // set groups order with 'list'
  var c_no = getColNames(table).indexOf(group);
  var opts = table.rows[2].cells[c_no].firstChild.options;
  var groups = [];
  for(let o of opts){ groups.push(o.value); }
  var sum_array = [];
  for(let i = 0; i < groups.length; i++){ sum_array[groups[i]] = 0; }
  for(let i = 0; i < groups.length; i++){
    if(grouped_array[groups[i]] !== void 0){
      var gr_ar = grouped_array[groups[i]];
      for(let j = 0; j < gr_ar.length; j++){
        sum_array[groups[i]] += Number(gr_ar[j]);
      }
    }
  }
  for(let i = 0; i < groups.length; i++){
    sum_array[groups[i]] = Math.round(sum_array[groups[i]] * 10000) / 10000;  // avoid dicimal error
    if(sum_array[groups[i]] === 0){ delete sum_array[groups[i]]; }
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



// DONE: utils ???
//    @paramas table  A table element.
//    @paramas type   A string to specify a data type, 
//                    which can be retrive by getDataTypes() as shown below.
//                    "fixed", "text", "button", "checkbox", 'list','number'. 
//    @return  A string array.
//    @examples
function colByType(table, type){
  var types = getDataTypes(table);
  var c_names = getColNames(table);
  var cols = [];
  for(let i = 0; i < types.length; i++){
    if(types[i] === type){ cols.push(c_names[i]); }
  }
  return cols;
}

// Create td with a child element. 
//    @paramas child A child element.
//    @return  A td element with a child element
function createTdWithChild(child){
  var td = document.createElement('td');
  td.appendChild(child);
  return td;
}

// Check if the same plot has already existed. 
//   @paramas plot A string to specify plot.
//   @return  A logical.
function hasDupPlot(plot){
  var tab_inputs = document.getElementById("tab_inputs");
  var input_tables = tab_inputs.querySelectorAll("table");
  for(let table of input_tables){
    if(table.id.split("_")[1] === "occ"){
      if(table.id.split("_")[2] === plot){
        alert("Duplicated PLOT!");
        return true;
      }
    }
  }
  return false;
}


// DONE: Save and load Settings 

// Load settings and replace setting table for plot or occurrence.
//   @paramas obj  A input element.
//                 Normally use "this". 
async function replaceTable(obj){
  var text = await readFile(obj.files[0]);
  var text = text.split(";");
  var table_name = obj.value.split("\\").slice(-1)[0].replace("\.conf", "")
  var new_table = makeTable(text, table_name, false);
  // Table
  var old_table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  old_table.replaceWith(new_table);
  // Title
  var old_title = obj.parentNode.parentNode.querySelectorAll("b")[0];
  var new_title = crEl({ el: 'B', tc: table_name})
  old_title.replaceWith( new_title );
}
// Helper for replaceTable(). 
function readFile(file){
  // https://www.delftstack.com/ja/howto/javascript/open-local-text-file-using-javascript/
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = x=> resolve(reader.result);
    reader.readAsText(file);
  })
}

// Save settings of plot or occurrence data.
//   @paramas obj  A input element.
//                 Normally use "this". 
function saveSettings(obj){
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var table_data = getTableDataPlus(table.id, shift_one = false);
  var f_name = obj.previousElementSibling.value;
  if(f_name === ""){ 
    f_name = table.id + ".conf"; 
  } else {
    f_name = table.id.split("_")[0] + "_" + table.id.split("_")[1] + "_" + f_name  + ".conf";
  }
  downloadStrings(strings = table_data, file_name = f_name)
}

// Save inputs of a table
//   @paramas obj  A input element.
//                 Normally use "this". 
function saveInputs(obj){
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var table_data = getTableDataPlus(table.id, shift_one = true);
  var f_name = table.id + "_" + getNow() + ".txt"
  downloadStrings(strings = table_data, file_name = f_name)
}

// Load example data
//   Using in example.html, run like as click buttons in html.
//   @paramas obj  A input element.
//                 Normally use "this". 
function loadExample(obj){
  // PLOT
  var make_plot_button = document.getElementById("dn_setting_plot_default").children[2];
  make_plot_button.click();
  var table = document.getElementById("input_plot_default");
  table.rows[2].cells[1].firstChild.value = "exam01";
  table.rows[2].cells[0].firstChild.click()
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

// dn.appendChild( createSelectOpt( colByType(table, "number") ) );
// dn.appendChild( createSelectOpt( colByType(table, "list") ) );
// dn.appendChild( createSumButton() );
// table = document.getElementById("input_occ_a_tb");
// colByType(table, "number")
