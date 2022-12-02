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

function createAutoSaveIntervalSelect(){
  var main = crEl({ el:'span' });
  main.appendChild( crEl({ el: 'span', ih: 'Auto save interval (min): ' }) );
  var settings = ['no save', '1', '3', '5', '10', '15', '30', '60'];
  var selects = createSelectOpt(settings, selected_no = 0, id = 'select_auto_save_interval');
  selects.setAttribute('onChange', 'changeAutoSaveSttting(this)');
  main.appendChild(selects);
  main.appendChild( crEl({ 'el': 'br' }) );
  return main;
}


function createSettingSelect(){
  var main = crEl({ el:'span' });
  main.appendChild( crEl({ el: 'span', ih: 'Choose <b>main</b> setting: ' }) );
  var settings = Object.keys(data_settings);
  var selects = createSelectOpt(settings, selected_no = 0, id = 'select_settings');
  selects.setAttribute('onChange', 'changeSettings(this)');
  main.appendChild(selects);
  main.appendChild( crEl({ 'el': 'br' }) );
  return main;
}

function changeSettingsByName(ns){
  var select = document.getElementById('select_settings');
  select.selectedIndex = getSelectOptionInCell(select).indexOf(ns)
  changeSettings(select);
}
function changeSettings(obj){
  var setting = obj.value;
  var new_plot_module = tableModule({ table_data: data_settings[setting].plot, ns: setting + '_plot',
                                      id_text: true, load_button: true, save_button: true, hide_button: true, 
                                      add_button: true });
  var new_occ_module = tableModule({ table_data: data_settings[setting].occ, ns: setting + '_occ',
                                      id_text: true, load_button: true, save_button: true, hide_button: true, 
                                      add_button: true });
  var old_plot_module = obj.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
  old_plot_module.replaceWith(new_plot_module);
  var old_occ_module = new_plot_module.nextSibling;
  old_occ_module.replaceWith(new_occ_module);
  setSortable(setting + '_plot_tb');
  setSortable(setting + '_occ_tb');
}

// Create table module
//   In a module has a table and other input elements, 
//   which operate the table.
// @param table_data    
// @param ns            A string to specify input table module.
// @retrun    A span including a table and other elements.
function tableModule({ table_data, ns, 
                       id_text, search_input, 
                       load_button, save_button, 
                       hide_button, fit_button, 
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


// DONE: update date GPS
// 
// Update "DATE", "LOC_LAT", "LOC_LON", "LOC_ACC"
//    When "Update" bottun clicked, update informations in the row.
//    @param obj Clicked row.
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
//   @param obj  A input element.
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
//    @param table  A table element.
//    @param type   A string to specify a data type, 
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
//    @param child A child element.
//    @return  A td element with a child element
function createTdWithChild(child){
  var td = document.createElement('td');
  td.appendChild(child);
  return td;
}


// DONE: Save and load Settings 

// Load settings and replace setting table for plot or occurrence.
//   @param obj  A input element.
//                 Normally use "this". 
async function replaceTable(obj){
  var json = await readFile(obj.files[0]);
  var table_data = JSON.parse(json);
  var ns = obj.value.split("\\").slice(-1)[0].replace("\.conf", "")
  var new_module = tableModule({ table_data: table_data, ns: ns,
                                      id_text: true, load_button: true, save_button: true, hide_button: true, 
                                      add_button: true });
  var old_ns = obj.parentNode.parentNode.id;
  var old_module = document.getElementById(old_ns);
  old_module.replaceWith(new_module);
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
//   @param obj  A input element.
//                 Normally use "this". 
function saveSettings(obj){
  var table = obj.parentNode.parentNode.querySelectorAll("table")[0];
  var table_data = getTableDataPlus(table);
  var table_json = JSON.stringify(table_data);
  var f_name = obj.nextElementSibling.value;
  if(f_name === ""){ f_name = table.id.replace(/_tb$/, ''); }
  downloadStrings(strings = table_json, file_name = f_name + ".conf")
}

