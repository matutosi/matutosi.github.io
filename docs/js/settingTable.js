// Create setting table for occurrence table
//    clss, id type, value, and placeholder create input tag for col_name. 
//    data_type and data_list create input tag with options.
//    opt_val creates input tag for options.
//    Occurrence table will be generated accoding to the setting table.
function createSettingTable(id_table){
  // // // settings // // // 
  const clss        = "table_setting";
  const id          = "01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16".split(',');
  const type        = "text";
  const value       = "date,locLat,locLon,locAcc,delButton,no,Identified,Sampled,Stand,Layer,Species,Cover,memo,,,".split(',');
  const placeholder = ",,,,,,,,,,,,,optional,optional,optional".split(',');
  const data_type   = "auto,auto,auto,auto,button,auto,checkbox,checkbox,fixed,list,text,number,text,,,,,".split(',');
  const data_list = "auto,auto,auto,auto,button,auto,checkbox,fixed,list,text,number,text".split(',');
  const opt_val = ";;;;;;;;Stand_01;B1,B2,S1,S2,K;;;;;;".split(';');
  // create table
  var table = document.getElementById(id_table);
  // table head
  const head = "col_name,input_typpe,option".split(',');
  var tr = document.createElement('tr');
  for(item of head){
      var th = document.createElement('th');
      th.innerHTML = item;
      tr.appendChild(th);
  }
  table.appendChild(tr);
  // table body
  const n_id = id.length;
  for(let i = 0; i < n_id; i++){
    var tr = document.createElement('tr');
    // col_name
    var td = document.createElement('td');
    td.appendChild(createInput(type, value[i], placeholder[i]));
    td.setAttribute("class", clss+'_1');
    td.setAttribute("id"   , 'ts_1_'+id[i]);
    tr.appendChild(td);
    // input_typpe
    var td = document.createElement('td');
    td.appendChild(createSelectOpt(Array(data_type[i]).concat(data_list)));
    td.setAttribute("class", clss+'_2');
    td.setAttribute("id"   , 'ts_2_'+id[i]);
    tr.appendChild(td);
    // option
    var td = document.createElement('td');
    td.appendChild(createInput(type, opt_val[i], ""));
    td.setAttribute("class", clss+'_3');
    td.setAttribute("id"   , 'ts_3_'+id[i]);
    tr.appendChild(td);
    // append
    table.appendChild(tr);
  }
}
// Helper to create input tag with class, id, type, value, and placeholder
function createInput(ty, va, pl, on, im){
  var input = document.createElement('input');
  input.setAttribute("type"       , ty);
  input.setAttribute("value"      , va);
  input.setAttribute("placeholder", pl);
  input.setAttribute("onclick"    , on);
  input.setAttribute("inputmode"  , im);
  return input;
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
