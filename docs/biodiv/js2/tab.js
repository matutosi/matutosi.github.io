function changeTab(){
  var ref = decodeURI(this.href);  // For multibyte character
  var targetid = ref.substring(ref.indexOf('#')+1, ref.length);
  // console.log([ref,targetid]);
  // show delected tab
  for(var i = 0; i < pages.length; i++) {
    if( pages[i].id != targetid ) {
      pages[i].style.display = "none";
    }
    else {
      pages[i].style.display = "block";
    }
  }
  // show front
  for(var i = 0; i < tabs.length; i++) {
    tabs[i].style.zIndex = "0";
  }
  this.style.zIndex = "10";
  // Updates
  updateInputsPlotLayerSpecies();

  // needs not to move tab
  return false;
}


function updateTab(){
  // get elements
  var tabs = document.getElementById('tabcontrol').getElementsByTagName('a');
  var pages = document.getElementById('tabbody').getElementsByTagName('div');
  // when clicked, enable to run changeTab() in all tab
  for(var i = 0; i < tabs.length; i++) {
    tabs[i].onclick = changeTab;
  }
}

function updateInputsPlotLayerSpecies(){
    // All plots
  updateAllInputsTables();

    // PLOT and Layer select in Tools
  updatePlotLayer({});



  //   var selector =  "select[id^='sp_list_select-']:not([id$='-wamei'])";
  //   var select_buttons = document.querySelectorAll(selector);
  // select_buttons[1].value;

    // species list
  var selector =  "input[id^='sp_list_update-']:not([id$='-wamei'])";
  var update_buttons = document.querySelectorAll(selector);
  for(let button of update_buttons){  button.click(); }
  // update_buttons[0]

    // add species form composition
  //   var selector = "input[id^='sp_list_add_comp-']:not([id$='-wamei'])";
  //   var add_comp_buttons = document.querySelectorAll(selector);
  //   for(let button of add_comp_buttons){  button.click(); }


}

function addPlotId(plot_data, id){
  // var plot_data = temp1;
  plot_data['biss_c_names'].unshift('PLOT');
  plot_data['biss_d_types'].unshift('fixed');
  plot_data['biss_selects'].unshift('');
  plot_data['biss_inputs']['PLOT'] = [id];
  return plot_data;
}

function addPlotNo(plot_data, no){
  // var plot_data = temp1;
  plot_data['biss_c_names'].unshift('NO');
  plot_data['biss_d_types'].unshift('fixed');
  plot_data['biss_selects'].unshift('');
  plot_data['biss_inputs']['NO'] = [no];
  return plot_data;
}

function getPlotMaxNo(){
  var tables = document.querySelectorAll("table[id^='input_plot']");
  var max_no = [0];
  for(let tb of tables){
    max_no.push(getColData(tb, "NO")[0]);
  }
  return Math.max.apply(Math, string2Numeric(max_no));
}

// Add a tab
//   in progress
function addInputTab({ obj, id }){
  // input PLOT name
  if(id == void 0){
    var id = prompt("Input PLOT name", "");
  }
  if(null === id){ 
    return void 0;
  }
  if(/_/.test(id)){
    alert("PLOT should NOT include '_' !\n Please use '-' instead.");
    return void 0; 
  }
  if('' === id){
    alert("PLOT should NOT be empty!");
    return void 0; 
  }
  if(null !== document.getElementById(id)){
    alert(id + " is already exist. PLOT should NOT be DUPLICATED!");
    return void 0; 
  }
  // create tabcontrol
  var a = crEl({ el: 'a', ats: {href: "#" + id}, ih: id });
  document.getElementById('tabcontrol').insertBefore(a, obj);

  // create tabbody
  var tabbody = document.getElementById('tabbody');
  var div = crEl({ el: 'div', ats: {id: id} });
  tabbody.appendChild(div);

  // create input tables
      // PLOT
  var plot_setting = convertTableData( getTableData( document.getElementById('tab_settings').getElementsByTagName('table')[0] ) );
  var plot_setting = addPlotNo(plot_setting, getPlotMaxNo() + 1);
  var plot_setting = addPlotId(plot_setting, id);
  var pl_table = tableModule({table_data: plot_setting, ns: 'input_plot_' + id, 
                              id_text: true, 
                              hide_button: true, fit_button: true })
  div.appendChild( pl_table );
  document.getElementById('input_plot_' + id + '_fit').onclick();

      // OCC
  var occ_setting = convertTableData( getTableData( document.getElementById('tab_settings').getElementsByTagName('table')[1] ) );
  var occ_setting  = addPlotId(occ_setting, id);
  var oc_table = tableModule({table_data: occ_setting, ns: 'input_occ_' + id, 
                              id_text: true, search_input: true,
                              hide_button: true, fit_button: true, 
                              add_button: true, calc_button: true})
  div.appendChild( oc_table );
  document.getElementById('input_occ_' + id + '_nrow').value = 3;
  document.getElementById('input_occ_' + id + '_add_rows').onclick();
  updateTab();
  tabs[tabs.length - 1].onclick();  // move tab
  var table = searchParentTable(oc_table);
  setSortable(table.id);  // Should setSortable() after appendChild()

  if(occ_setting.biss_c_names.indexOf('Layer') < 0){ 
    var show_select_layer = void 0;
  }else{
    var show_select_layer = true;
  }
  var ul_module = createSpecieUlModule({ species: '', ns: id,
                  show_select_button   : true, 
                  show_text_input      : true, 
                  show_select_layer    : show_select_layer   });
  div.appendChild( ul_module );
  // all update
  updateInputsPlotLayerSpecies()
}

function updateAllInputsTables(){
  var pl_table = createAllInputsTable('input_plot')
  var oc_table = createAllInputsTable('input_occ' )
  if(pl_table === void 0){ return void 0; }
  document.getElementById('plot_all').replaceWith(pl_table);
  document.getElementById('occ_all' ).replaceWith(oc_table);
  setSortable( searchParentTable(pl_table).id );
  setSortable( searchParentTable(oc_table).id );

  var tables = document.querySelectorAll("table[id^='input_occ']");
  var comp_table = createCompTable(tables);
  document.getElementById('comp_table').replaceWith(comp_table);
  setSortable( searchParentTable(comp_table).id );
}

function createAllInputsTable(table_name){
  // var table_name = "input_occ"; var table_name = "input_plot";
  var tables = document.querySelectorAll("table[id^='" + table_name + "']");
  if(0 === tables.length){ return void 0; }  // return void 0, when no input tables
  var c_names = getUniqeColNames(tables);
  var removals = ['DATE', 'DATE', "LOC_LAT","LOC_LON","LOC_ACC","DELETE","UPDATE_TIME_GPS"];
  var c_names = c_names.filter(item => ! removals.includes(item));

  var inputs = getMultiTableInputs(tables, c_names);
  var d_types = []; for(let i = 0; i <c_names.length; i++){ d_types.push('fixed'); }
  var selects = []; for(let i = 0; i <c_names.length; i++){ selects.push(''); }

  var all_data = {
    biss_c_names: c_names,
    biss_d_types: d_types,
    biss_selects: selects,
    biss_inputs : inputs
  }

  var all_table_name = table_name.split("_")[1] + '_all';
  //   var all_table = makeTableJO(all_data, all_table_name);
  var all_table = tableModule({table_data: all_data, ns: all_table_name,
                              id_text: true, search_input: true,
                              hide_button: true});
  return all_table;
}
function getUniqeColNames(tables){
  var c_names = [];
  for(let i = 0; i < tables.length; i++) {
    var c_names = c_names.concat(getColNames(tables[i]));
  }
  return uniq(c_names);
}
function getMultiTableInputs(tables, c_names){
  var inputs = [];
  for(let c_name of c_names){
    inputs[c_name] = [];
    for(let tb of tables){
  // console.log(tb);
  // console.log(c_name);
      inputs[c_name] = inputs[c_name].concat(getColData(tb, c_name));
    }
  }
  return inputs;
}

function getMultiTableOptions(tables, c_names){
  var options = [];
  for(let c_name of c_names){
    options[c_name] = [];
    for(let tb of tables){
      options[c_name] = options[c_name].concat(getSelectOne(tb, c_name));
    }
  }
  options
  return options;
}

function checkSameAs(inputs, pl, sp, id, sa){
  // var inputs = temp1; var pl = 'PLOT'; var sp = 'Species'; var id = 'Identified'; var sa = 'SameAs';
  for(let i=0; i < inputs[pl].length; i++){
    if(inputs[id][i] === false)
      if(inputs[sa][i] === ''){
         inputs[sp][i] = inputs[sp][i] + '_' + inputs[pl][i];
       }else{
         inputs[sp][i] = inputs[sp][i] + '_' + inputs[sa][i];
      }
  }
  return inputs;
}
function createCompTable(tables, pl = "PLOT", sp = "Species", ab = "Cover", id = "Identified", sa = "SameAs"){
  // var pl = "PLOT";var sp = "Species"; var ab = "Cover"; var tables = document.querySelectorAll("table[id^='input_occ']");
  var inputs = getMultiTableInputs(tables, [pl, sp, ab, id, sa]);
  // console.log(inputs);
  var inputs = checkSameAs(inputs, pl, sp, id, sa)
  var uniq_pl = uniq(inputs[pl]);
  var uniq_sp = uniq(inputs[sp]);
  var c_names = [sp].concat(uniq_pl);
  var data_table = [];
  data_table[sp] = uniq_sp;
  for(let p of uniq_pl){
    var data_col = [];
    for(let s of uniq_sp){
      var value = 0;
      var is_present = 0;
      for(let i=0; i < inputs[ab].length; i++){
        if(inputs[pl][i] === p && inputs[sp][i] === s ){
          value = value + Number(inputs[ab][i]);
          is_present++;
        }
      }
      if(is_present === 0){  // absent
        var value = '';
      }else{                 // present
        if(value === 0){
          var value = '--';
        }
      }
      data_col.push(value);
    }
    data_table[p] = data_col;
  }
  data_table;

  var d_types = []; for(let i = 0; i <c_names.length; i++){ d_types.push('fixed'); }
  var selects = []; for(let i = 0; i <c_names.length; i++){ selects.push(''); }
  var comp_data = {
    biss_c_names: c_names,
    biss_d_types: d_types,
    biss_selects: selects,
    biss_inputs : data_table
  }
  var comp_table = tableModule({table_data: comp_data, ns: 'comp_table',
                              id_text: true, search_input: true,
                              hide_button: true})
  return comp_table;
}

function changePlotName(obj){
  var new_name = obj.previousElementSibling.value;
 // var old_name = obj.parentNode.
  // change tab name
  //   document.getElementById('tabcontrol').insertBefore(a, obj);
  //   document.getElementById('tabbody').appendChild(div);
  // 

  //   var document.
  
}

