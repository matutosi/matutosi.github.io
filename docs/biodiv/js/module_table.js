
function tableModule(ns){
  // var ns = "occ_input_table_example_01";
  var main   = crEl({ el:'span', id: "main_"   + ns});

  // Up span
  var up = crEl({ el:'span', ats:{id: "up_" + ns} });
  up.appendChild( crEl({ el: 'B', tc: ns}) );
  up.appendChild( createSearchInput() );
  up.appendChild( createHideButton() );
  up.appendChild( crEl({ el: 'br' }) );
  up.appendChild( crEl({ el: 'span'}) );
  main.appendChild(up);

  // Table
  var table = restoreTable(ns, from = "");

  // Down span
  var dn = crEl({ el:'span', ats:{id: "dn_" + ns} });
  dn.appendChild( createNrowInput() );
  dn.appendChild( createAddRowButton() );
  dn.appendChild( crEl({ el: 'br' }) );
  dn.appendChild( crEl({ el: 'span', tc: "Value: " }) );
  dn.appendChild( createSelectOpt( colByType(table, "number") ) );
  dn.appendChild( crEl({ el: 'span', tc: "; Group: " }) );
  dn.appendChild( createSelectOpt( colByType(table, "select-one") ) );
  dn.appendChild( createSumButton() );

  main.appendChild(up);
  main.appendChild(table);
  main.appendChild(dn);
  main.appendChild( crEl({ el: 'hr' }) );

  return main;
}


function showAllCols(obj){
  // console.log(obj.parentNode.parentNode.nextElementSibling);
  var table = obj.parentNode.parentNode.nextElementSibling;
  for(let Ci = 0; Ci < table.rows[0].cells.length; Ci++){
    for(let Rj = 0; Rj < table.rows.length; Rj++){
      table.rows[Rj].cells[Ci].style.display = '';
    }
  }
  obj.parentNode.textContent = "";
}


// Hide a column in a table.
function hideTableCol(obj){
  var table = obj.parentNode.parentNode.parentNode;
  var c_name = obj.parentNode.innerText;
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
  var table = obj.parentNode.parentNode.nextElementSibling;
  var c_no = getColNames(table).indexOf(c_name);
  for(let Rj = 0; Rj < table.rows.length; Rj++){
      table.rows[Rj].cells[c_no].style.display = '';
  }
  // remove
  if(obj.parentNode.children.length === 1){ obj.parentNode.textContent = ""; }
  obj.remove();
}


function createShowColButton(c_name){
  return createInput({ type: "Button", value: c_name, onclick: "showCol(this)" });
}


// Sum with group
function sumWithGroup(obj){
  var array = obj.previousElementSibling.previousElementSibling.previousElementSibling.value;
  var group = obj.previousElementSibling.value;
  var table = obj.parentNode.previousElementSibling;
  var array_val = getColData(table, array);
  var group_val = getColData(table, group);
  var grouped_array = splitByGroup(array_val, group_val);

  var groups = Object.keys(grouped_array).sort();
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

function createSumButton(){
  return createInput({ type: "Button", value: "Calculate", onclick: "sumWithGroup(this)" });
}

function createSearchInput(){
  return createInput({ type:"text", onkeyup: "searchTableText(this)", placeholder: "Search text" });
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
  var table  = obj.parentNode.nextElementSibling;
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
  var table = obj.parentNode.previousElementSibling;
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


function createNrowInput(){
  return createInput({ type: "number", value: "3", step: "1", min: "1", max:"20" });
}

function createAddRowButton(){
  return createInput({ type: "button", value: "Add row(s)", onclick: "addRows(this)" });
}

function createHideButton(){
  return createInput({ type: "button", value: "Hide table", onclick: "hideShowNext(this)" });
}

function hideShowNext(obj){
  // console.log(obj);
  // console.log(obj.parentNode.nextElementSibling);
  var next   = obj.parentNode.nextElementSibling;
  var next_2 = obj.parentNode.nextElementSibling.nextElementSibling;
  if(next.style.display === 'none'){
    next.style.display = '';
    next_2.style.display = '';
    obj.value = "Hide table";
  } else {
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
