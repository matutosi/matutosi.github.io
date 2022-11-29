

function stageWamei(array, input, ns = 'wamei'){
  var reg_exp = makeLookAheadReg(input);
  var species = grepArray(array, reg_exp);
  var id = 'sp_list_sp_list-' + ns;
  //   var ul = document.getElementById(id);
  var ul = crEl({ el:'ul', ats:{id: id} });
  for(let sp of species){
    var li = crEl({ el:'li' })
    var button = createSpeciesButton({ sp: sp, to_stage: true, ns: ns })
    li.appendChild(button);
    ul.appendChild(li);
  }
  var span = document.getElementById('sp_list_module-all');
  span.appendChild(ul);
}

  // var span = document.getElementById('tab_tools');
  // var reg_exp = makeLookAheadReg('イシ ナラ');
  // var sp_wamei = createSpecieUlModule(species: species, ns: 'wamei');
  // span.appendChild(sp_wamei);


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
  up.appendChild( crEl({ el: 'B', tc: ns}) );
  up.appendChild( createSearchShowInput() );
  up.appendChild( createSearchShowButton() );
  // Table
  var table = generateTable(wamei);
  // Main
  var main   = crEl({ el:'span', ats:{id: "main_"   + ns} });
  main.appendChild(up);
  main.appendChild(table);
  return main;
}
