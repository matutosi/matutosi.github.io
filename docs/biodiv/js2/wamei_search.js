function getChildrenValues(element){
  var values = [];
  for(let child of element.children){
    values.push(child.value);
  }
  return values;
}
function addSpecies(obj){
  // var obj = temp1;
  // get data
  var staged = obj.parentNode.children[2];
  var input  = obj.parentNode.children[4];    // Here, don't use "obj.parentNode.children[4].value" ; this don't work in clear inputs
  var plot   = obj.parentElement.children[7]; // parentNode don't work (can't specify the reason)
  var plot   = plot.children[plot.selectedIndex].value;
  var layer  = obj.parentNode.children[10];
  var layer = layer.children[layer.selectedIndex].value;
  var sp = getChildrenValues(staged);
  if(input.value !== ''){ var sp = sp.concat(input.value.split(',')); }

  // add species
  var table = document.getElementById('input_occ_' + plot + '_tb');
  for(let s of sp){
    addRowWithValues({ table: table, values: {Layer: layer, Species: s} });
  }

  // clear inputs
  input.value = '';
    // Delete from the front, elements will be shifted and don't work well
  for(let i = staged.children.length; 0 < i; i--){ // loop backwards
    staged.children[i-1].click();
  }
}

function updateSpeciesList(){
  var old_sp_list = document.getElementById('sp_list');
  var new_sp_list = createSpeciesList(sp_list);
  old_sp_list.replaceWith(new_sp_list);

  var tables = document.querySelectorAll("table[id^='input_occ']");
  var old_plot_list = document.getElementById('plot_select');
  var new_plot_list = createPlotSelect(tables);
  old_plot_list.replaceWith(new_plot_list);

  var old_layer_list = document.getElementById('layer_select');
  var new_layer_list = createLayerSelect(tables);
  old_layer_list.replaceWith(new_layer_list);
}

// Helper functions for generateSpeciesTable()
// species list
function createSpeciesList(species, n=15){
  var table = crEl({ el: 'table', ats: {id: 'sp_list'} });
  var ncol_sp = Math.ceil(species.length / n);
  var c_names = [];
  for(i = 0; i < ncol_sp; i++){ c_names.unshift('Species'); }
  addThTr(table, c_names);
  var tr = crEl({ el: 'tr' });
  var td = crEl({ el: 'td'} );
  for(let j = 0; j < species.length; j++){
    td.appendChild( createSpeciesButton({ sp: sp_list[j], to_stage: true }) );
    td.appendChild( crEl({ el: 'br' }) );
    if( ((j+1) % n) === 0){
      tr.appendChild(td);
      if( species.length !== j+1 ){ var td = crEl({ el: 'td'} ); }
    }
  }
  if(n * ncol_sp !== species.length){ tr.appendChild(td); }
  table.appendChild(tr);
  return table;
}
// plot select
function createPlotSelect(tables, pl = 'PLOT'){
  var pl = 'PLOT';
  var plot_list = uniq(getMultiTableInputs(tables, [pl])[pl]);
  var plot_select = createSelectOpt(plot_list, 0);
  plot_select.id = 'plot_select';
  return plot_select;
}
// layer select
function createLayerSelect(tables, pl = 'PLOT'){
  var ly = 'Layer';
  var layer_list = uniq(getMultiTableOptions(tables, [ly])[ly]);
  var layer_select = createSelectOpt(layer_list, layer_list.length - 1);
  layer_select.id = 'layer_select';
  return layer_select;
}


function generateSpeciesTable(species){
  var main = crEl({ el: 'span', ats: {id: 'species_list'} });
  main.appendChild( crEl({ el:'input', ats:{type:'button', id:'update_input_species_list', value: 'Update input species list', onclick: 'updateSpeciesList()'} }) );

  // species list
  main.appendChild(createSpeciesList(species, 15));

  // species staged
  var sp_staged = crEl({ el: 'span', ats:{ id: 'sp_staged'} })
  main.appendChild(sp_staged);
  main.appendChild( crEl({ el: 'br' }) );
  var placeholder = "Input species (separate with ',')";
  main.appendChild( crEl({ el:'input', ats:{type: 'text', id: 'sp_input', placeholder: placeholder, size:'100'} }) );
  main.appendChild( crEl({ el: 'br' }) );

  // plot, layer, add
  var tables = document.querySelectorAll("table[id^='input_occ']");
  main.appendChild( crEl({ el:'span', ih: 'PLOT:' }) );
  main.appendChild( createPlotSelect(tables) );
  main.appendChild( crEl({ el:'span', ih: ', ' }) );
  main.appendChild( crEl({ el:'span', ih: 'Layer:' }) );
  main.appendChild( createLayerSelect(tables) );
  main.appendChild( crEl({ el:'input', ats:{type: 'button', value: 'Add species', onclick: 'addSpecies(this)' } }) );

  main.appendChild( crEl({ el: 'hr' }) );
  return main;
}


function createSpeciesButton({ sp, to_stage} ){
  if(to_stage){
    var id = 'sp_' + sp
    var onclick = "stageSpecies(this)"
  }else{
    var id = 'staged_sp_' + sp;
    var onclick = "unStageSpecies(this)"
  }
  return crEl({ el:'input', ats:{type: "button", value: sp, onclick: onclick, id: id } });
}

function stageSpecies(obj){
  var sp_staged = document.getElementById('sp_staged');
  var sp = obj.value;
  obj.setAttribute("disabled", true);
  sp_staged.appendChild( createSpeciesButton({ sp, to_stage: false }) );
  //   sp_staged.appendChild( crEl({ el: 'br' }) );
}
function unStageSpecies(obj){
  var id = 'sp_' + obj.value;
  var sp_button = document.getElementById(id);
  sp_button.removeAttribute("disabled");
  //   obj.nextElementSibling.remove();
  obj.remove();
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
