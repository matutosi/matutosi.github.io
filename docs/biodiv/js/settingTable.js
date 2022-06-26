function createSpanSettings(ns){
  // main-span
  var main = document.getElementById('setting');
  var span = document.createElement('span');
  span.setAttribute("id", ns + "_span");
  main.appendChild(span);
  // span-contents
  var contents = document.createElement('span');
  contents.setAttribute("id", ns + "_contents");
  contents.style.display  = "block"; // default: show contents
  // contents
  contents.appendChild(createSetting(       ns + "_table", "data." + ns + "_json"));
  contents.appendChild(createInputNrow(     ns + "_table_n_row"     ));
  contents.appendChild(createButtonAddRow(  ns + "_table"           ));  // input: table name to add rows
  contents.appendChild(createButtonNewTable(ns + "_new_table"       ));
  span.appendChild(contents);

  // switch to hide/show
  span.appendChild(createButtonHideShow(ns + "_contents" ));
  span.appendChild(document.createElement('hr'));
}

// Create captions for settings
function createInputNrow(id_input){
  return createInput({ id: id_input, type: "number", value: "3", step: "1", min: "1", max:"20" });
}
function createButtonAddRow(table){
  return createInput({ type: "button", value: "add row", onclick: "cloneRows('" + table + "')" });
}
function createButtonNewTable(id_table){
  var name = id_table.split('_')[0]; // meta, plot, occ
  return createInput({ type: "button", value: "Create new " + name + " table", 
    onclick: "createOccurrenceTable('setting', name+'-setting', name+'-table')" });
}
function createButtonHideShow(id){
  return createInput({ type: "button", value: "show / hide", onclick: "switchHideShow('" + id +"')" })
}
function switchHideShow(id){
  var contents = document.getElementById(id);
  if(contents.style.display=="block"){ contents.style.display = "none";  }  // show -> hide
  else                               { contents.style.display = "block"; }  // hide -> show
}


function createTd(child){
  var td = document.createElement('td');
  td.appendChild(child);
  return td;
}

// Create setting table
//    TODO: Write documents !!!!!!!!!!!!
//    
//    
function createSetting(id_table, json){
// var json = data.stand_json;
// var id_table = "setting_stand";
  var json = eval(json);  // convert String to JSON object
  // // // settings // // // 
  // data.stand_json: item, type, value, option, hide
  for(key of jsonKeys(json)){
    eval("var " + key + " = extractJson(json)['" + key + "'];");
  }
  var heads = jsonKeys(json);
  const data_types = data.data_types;

  // table
  var table = document.createElement('table');
  table.setAttribute("id", id_table);

  // head
  var tr = document.createElement('tr');
  for(head of heads){
    var th = document.createElement('th');
    th.innerHTML = head;
    tr.appendChild(th);
  }
  table.appendChild(tr);

  // body
  for(let i = 0; i < json.length; i++){
    var tr = document.createElement('tr');
    // item
    var td = createTd( createInput({ type: "text", value: item[i] }) );
    tr.appendChild(td);
    // type
    var td = createTd( createSelectOpt( Array(type[i]).concat(data_types) ) );
    tr.appendChild(td);
    // value
    var td = createTd( createInput({ type: "text", placeholder: option[i] }) );
    tr.appendChild(td);
    // option
    var td = createTd( createInput({ type: "text", value: value[i] }) );
    tr.appendChild(td);
    // show/hide checkbox
    var td = createTd( createInput({ type: "checkbox", onclick: "hideCol('occurrence')" }) );
    tr.appendChild(td);
    // delButton
    var td = createTd( createDelButton() );
    tr.appendChild(td);
    // append
    table.appendChild(tr);
  }
  return table;
}

function createSettingTable(id_span, id_table, json){
// var json = data.stand_json;
// var id_span = "setting_stand";
// var id_table = "setting_stand";

  // // // settings // // // 
  // data.stand_json: item, type, value, option, hide
  for(key of jsonKeys(json)){
    eval("var " + key + " = extractJson(json)['" + key + "'];");
  }
  var heads = jsonKeys(json);
  const data_types = data.data_types;

  // span, table
  var span = document.getElementById(id_span);
  var table = document.createElement('table');
  table.setAttribute("id", id_table);

  // head
  var tr = document.createElement('tr');
  for(head of heads){
    var th = document.createElement('th');
    th.innerHTML = head;
    tr.appendChild(th);
  }
  table.appendChild(tr);

  // body
  for(let i = 0; i < json.length; i++){
    var tr = document.createElement('tr');
    // item
    var td = createTd( createInput({ type: "text", value: item[i] }) );
    tr.appendChild(td);
    // type
    var td = createTd( createSelectOpt( Array(type[i]).concat(data_types) ) );
    tr.appendChild(td);
    // value
    var td = createTd( createInput({ type: "text", placeholder: option[i] }) );
    tr.appendChild(td);
    // option
    var td = createTd( createInput({ type: "text", value: value[i] }) );
    tr.appendChild(td);
    // show/hide checkbox
    var td = createTd( createInput({ type: "checkbox", onclick: "hideCol('occurrence')" }) );
    tr.appendChild(td);
    // delButton
    var td = createTd( createDelButton() );
    tr.appendChild(td);
    // append
    table.appendChild(tr);
  }
  span.appendChild(table);
}

// Create setting table for occurrence table
//    clss, id type, value, and placeholder create input tag for col_name. 
//    data_type and data_list create input tag with options.
//    opt_val creates input tag for options.
//    Occurrence table will be generated accoding to the setting table.
function createSettingTable_1(id_table){
  // // // settings // // // 
  const clss        = "ts_";
  const id          = "01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16".split(',');
  const text        = "text";
  const data_list = "auto,button,checkbox,fixed,list,text,number".split(',');

// var id_span = "setting_stand";
// var id_table = "setting_stand";
var json = data.occ_json;
  for(key of jsonKeys(json)){
    eval("var " + key + " = extractJson(json)['" + key + "'];");
  }

  // create table
  var table = document.getElementById(id_table);
  // table head
  const heads = "col_name,input_typpe,option,hide".split(',');
  var tr = document.createElement('tr');
  for(head of heads){
      var th = document.createElement('th');
      th.innerHTML = head;
      tr.appendChild(th);
  }
  table.appendChild(tr);
  // table body
  const n_id = id.length;
  for(let i = 0; i < n_id; i++){
    var tr = document.createElement('tr');
    // col_name
    var td = document.createElement('td');
    td.appendChild(createInput( {type: text, value: item[i]}));
    td.setAttribute("class", clss+'cnames');
    td.setAttribute("id"   , 'ts_1_'+id[i]);
    tr.appendChild(td);
    // input_typpe
    var td = document.createElement('td');
    td.appendChild(createSelectOpt(Array(type[i]).concat(data_list)));
    td.setAttribute("class", clss+'itypes');
    td.setAttribute("id"   , 'ts_2_'+id[i]);
    tr.appendChild(td);
    // option
    var td = document.createElement('td');
    td.appendChild(createInput({ type: type, value: value[i] }));
    td.setAttribute("class", clss+'option');
    td.setAttribute("id"   , 'ts_3_'+id[i]);
    tr.appendChild(td);
    // show/hide checkbox
    var td = document.createElement('td');
    td.appendChild(createInput({ type: "checkbox" }));
    td.setAttribute("class"  , clss+'checkbox');
    td.setAttribute("id"     , 'ts_4_'+id[i]);
    td.setAttribute("onclick", "hideCol('occurrence')");
    tr.appendChild(td);
    // append
    table.appendChild(tr);
  }
}

// Hide columns checked in table setting
function hideCol(id_table){
  var table = document.getElementById(id_table);
  var checkbox = document.getElementsByClassName('ts_checkbox');
  var hide = getChecked(getFirstChild(checkbox));
  for(let Ci = 0; Ci < table.rows[0].cells.length; Ci++){
    for(let Rj = 0; Rj < table.rows.length; Rj++){
      table.rows[Rj].cells[Ci].style.display = (hide[Ci]) ? 'none' : '';
    }
  }
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


// Helper to create input tag with class, id, type, value, and placeholder
function createInput({type = "text", value = null, placeholder = null, checked = null, max = null, min = null, step = null, inputmode = null, onclick = null, required = null, id = null, clss = null }){
  var input = document.createElement('input');
  if( type        != null){ input.setAttribute("type"       , type       ); }
  if( value       != null){ input.setAttribute("value"      , value      ); }
  if( placeholder != null){ input.setAttribute("placeholder", placeholder); }
  if( checked     != null){ input.setAttribute("checked"    , checked    ); }
  if( step        != null){ input.setAttribute("step"       , step       ); }
  if( max         != null){ input.setAttribute("max"        , max        ); }
  if( min         != null){ input.setAttribute("min"        , min        ); }
  if( inputmode   != null){ input.setAttribute("inputmode"  , inputmode  ); }
  if( onclick     != null){ input.setAttribute("onclick"    , onclick    ); }
  if( required    != null){ input.setAttribute("required"   , required   ); }
  if( id          != null){ input.setAttribute("id"         , id         ); }
  if( clss        != null){ input.setAttribute("class"      , clss       ); }
  return input;
}

// Helper to create input tag with class, id, type, value, and placeholder (old version)
function createInput_1(ty, va, pl, on, im){
  var input = document.createElement('input');
  input.setAttribute("type"       , ty);
  input.setAttribute("value"      , va);
  input.setAttribute("placeholder", pl);
  input.setAttribute("onclick"    , on);
  input.setAttribute("inputmode"  , im);
  return input;
}

