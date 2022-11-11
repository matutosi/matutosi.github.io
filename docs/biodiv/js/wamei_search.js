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
