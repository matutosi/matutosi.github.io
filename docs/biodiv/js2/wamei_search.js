// wamei
function createWameiSpan(){
  // Up span
  var main = crEl({ el:'span', ats:{id: 'wamei'} });
  main.appendChild( createSearchShowInput()   );
  main.appendChild( createSearchWameiButton() );
  return main;
}

function createSearchWameiButton(){
  return createInput({ type: "button", value: "Search wamei", onclick: "searchWamei(this)" });
}

function searchWamei(obj){
  var parent    = obj.parentNode;
  var input     = obj.previousElementSibling.value;
  var reg_exp   = makeLookAheadReg(input);
  var species   = grepArray(wamei, reg_exp);
  var ul_module = createSpecieUlModule({ species: species, ns: 'wamei',
                  show_button_update_pl: true, show_select_plot     : true, show_select_layer   : true });
  parent.appendChild( ul_module );
}



function generateTable(data){
  var table = crEl({ el: 'table' });
  table.appendChild( crEl({ el: 'th', tc: "wamei" }) );
  for(let i = 0; i < data.length; i++){
    var tr = crEl({ el: 'tr' });
    var td = crEl({ el: 'td', tc: data[i] });
    tr.appendChild( td );
    tr.style.display = 'none';
    table.appendChild(tr);
  }
  return table
}

// wamei
function generateSearchTable(ns, table){
  // Up span
  var up = crEl({ el:'span', ats:{id: "up_" + ns} });
  up.appendChild( crEl({ el: 'B', tc: ns})  );
  up.appendChild( createSearchShowInput()   );
  up.appendChild( createSearchShowButton()  );
  up.appendChild( createSearchWameiButton() );
  // Table
  var table = generateTable(wamei);
  // Main
  var main   = crEl({ el:'span', ats:{id: "main_"   + ns} });
  main.appendChild(up);
  main.appendChild(table);
  return main;
}
