function createSettingSpan(ns){
  // main-subtitle
  var main = document.getElementById('setting');
  main.appendChild( crElAtIhTc({ el: 'strong',ih: ns }) );
  main.appendChild( createButtonHideShow(ns + "_contents" ) );
  // main-span
  var span = crElAtIhTc({ el: 'span', ats: {id: ns } });
  main.appendChild(span);
  // span-contents
  var contents = crElAtIhTc({ el: 'span', ats: {id: ns + "_contents" } });
  contents.style.display  = "block"; // default: show contents
  // contents
  contents.appendChild( createSetting(       ns + "_table", "data." + ns + "_json"));
  contents.appendChild( createInputNrow(     ns + "_table_n_row"     ));
  contents.appendChild( createButtonAddRow(  ns + "_table"           ));  // input: table name to add rows
  contents.appendChild( createButtonNewTable(ns + "_new_table"       ));
  span.appendChild(contents);
  // hr for division
  span.appendChild(document.createElement('hr'));
}

// Create captions for settings
function createInputNrow(id_input){
  return createInput({ id: id_input, type: "number", value: "3", step: "1", min: "1", max:"20" });
}
function createButtonAddRow(table){
  return createInput({ type: "button", value: "Add row(s)", onclick: "cloneRows('" + table + "')" });
}
function createButtonNewTable(id_table){
  var name = id_table.split('_')[0]; // meta, plot, occ
  var value = "Create new " + name + " table";
  var onclick = "createInputSpan('" + name + "')";
  //   var onclick = "createOccurrenceTable('input', '" + name + "_setting_table', '" + name + "_input_table')"
  // console.log(onclick);
  return createInput({ type: "button", value: value, onclick: onclick });
}
function createButtonHideShow(id_span){
  var id      = id_span + "_hide_show";
  var onclick = "switchHideShow('" + id_span + "', this)";
  return createInput({id: id, type: "button", value: "Hide table", onclick: onclick })
}
function switchHideShow(id_span, button){
  var contents = document.getElementById(id_span);
  if(contents.style.display === "block"){ // show -> hide
    contents.style.display = "none";
    button.setAttribute("value", "Show table");
  }else{                                  // hide -> show
    contents.style.display = "block";
    button.setAttribute("value", "Hide table");
  }
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
  var table = crElAtIhTc({ el: 'table', ats: {id: id_table} });

  // head
  var tr = document.createElement('tr');
  for(head of heads){  tr.appendChild(crElAtIhTc({ el: 'th', ih: head })); }
  table.appendChild(tr);

  // body
  for(let i = 0; i < json.length; i++){
    var tr = document.createElement('tr');
    // item
    tr.appendChild( createTd( createInput({ type: "text", value: item[i] }) ) );
    // type
    tr.appendChild( createTd( createSelectOpt( Array(type[i]).concat(data_types) ) ) );
    // value
    tr.appendChild( createTd( createInput({ type: "text", placeholder: option[i] }) ) );
    // option
    tr.appendChild( createTd( createInput({ type: "text", value: value[i] }) ) );
    // show/hide checkbox
    var input_table = id_table.split("_")[0] + "_input_table";    // id_table: setting_table
    tr.appendChild( createTd( createInput({ type: "checkbox", onclick: "hideCol('" + id_table + "', '" + input_table + "')" }) ) );
    // delButton
    tr.appendChild( createTd( createDelButton() ) );
    // append
    table.appendChild(tr);
  }
  return table;
}

// Hide columns checked in table setting
function hideCol(setting_table, input_table){
  var hide = getColData(document.getElementById(setting_table), "hide");
  var table = document.getElementById(input_table);
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
//    @example
//    createInput({ type: "text", value: "Val"});
//    createInput({ type: "button", value: "Push here"});
function createInput( ...args ){
  var input = document.createElement('input');
  var keys  = Object.keys(args[0]);
  for(key of keys){
    input.setAttribute(key, args[0][key]);
  }
  return input;
}
