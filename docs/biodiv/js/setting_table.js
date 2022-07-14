// Create td with a child element. 
//    @paramas child A child element.
//    @return  A td element with a child element
function createTdWithChild(child){
  var td = document.createElement('td');
  td.appendChild(child);
  return td;
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
