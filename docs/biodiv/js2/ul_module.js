
function createSpecieUlModule(species, ns){
  // var ns = 'all'; var species = sp_list;
  var base_name = 'sp_list_';
  var main = crEl({el:'span',          ats:{id:    base_name + 'module-' + ns} });
  var ncol_select   = createNumberSelect(          base_name + 'ncols-'  + ns);
  var update_button = createUpdateSLButton(        base_name + 'update-' + ns);;
  var sp_list       = createSpecieList(species,    base_name + 'sp_list-'+ ns);
  var staged        = crEl({ el: 'span', ats:{ id: base_name + 'staged-' + ns} });
  var input         = createSLInput(               base_name + 'input_'  + ns);
  var select_plot   = createSelectPlot(            base_name + 'plot-'   + ns);
  var select_layer  = createSelectLayer(           base_name + 'layer-'  + ns);
  var add           = createSLAdd(                 base_name + 'add-'    + ns);
  main.appendChild(ncol_select);
  main.appendChild(update_button);
  main.appendChild(sp_list);
  main.appendChild( crEl({el:'hr'}) );
  main.appendChild(staged);
  main.appendChild( crEl({ el: 'br' }) );
  main.appendChild(input);
  main.appendChild( crEl({ el: 'br' }) );
  main.appendChild(select_plot);
  main.appendChild(select_layer);
  main.appendChild(add);

  main.appendChild( crEl({el:'hr'}) );
  return main;
}


function createNumberSelect(id){
  var span = crEl({el:'span', ats:{id: id}, ih: "<b>No. of Column: </b>" });
  var select = createSelectOpt([1,2,3,4,5,6,7,8,9], 5);
  select.setAttribute('onchange', 'changeUlColumns(this)');
  span.appendChild(select);
  return span;
}
function changeUlColumns(obj){
  var ncols = obj.value;
  document.documentElement.style.setProperty('--cc', ncols);
}
function createUpdateSLButton(id){
  return crEl({ el:'input', ats:{type:'button', id: id, value: 'Update species list', onclick: 'updateSpeciesList(this)'} });
}
function createSpecieList(species, id){
  var ns = id.split('-')[1];
  var ul = crEl({ el:'ul', ats:{id: id} });
  for(let sp of species){
    var li = crEl({ el:'li' })
    var button = createSpeciesButton({ sp: sp, to_stage: true, ns:ns })
    li.appendChild(button);
    ul.appendChild(li);
  }
  return ul;
}
function createSpeciesButton({ sp, to_stage, ns }){
  if(to_stage){
    var id = ns + '_sp_' + sp
    var onclick = "stageSpecies(this)"
  }else{
    var id = ns +  '_staged_sp_' + sp;
    var onclick = "unStageSpecies(this)"
  }
  return crEl({ el:'input', ats:{type: "button", value: sp, onclick: onclick, id: id } });
}
function createSLInput( id ){
  //   var span = crEl({ el:'span' });
  var placeholder = "Input species (separate with ',')";
  return crEl({ el:'input', ats:{type: 'text', id: id, placeholder: placeholder, size:'100'} });
}
function createSelectPlot(id){
  var span = crEl({ el:'span', ih: 'PLOT:', ats:{id:id} });
  var ns = id.split('-')[1];
  if(ns === 'all'){
    var tables = document.querySelectorAll("table[id^='input_occ']");
    var pl = 'PLOT';
    var plot_list = uniq(getMultiTableInputs(tables, [pl])[pl]);
  }else{
    var plot_list = [ns];
  }
  var plot_select = createSelectOpt(plot_list, 0);
  span.appendChild(plot_select)
  return span;
}
function createSelectLayer(id){
  var span = crEl({ el:'span', ih: 'Layer:', ats:{id:id} });
  var tables = document.querySelectorAll("table[id^='input_occ']");
  var ly = 'Layer';
  var layer_list = uniq(getMultiTableInputs(tables, [ly])[ly]);
  var layer_select = createSelectOpt(layer_list, 0);
  span.appendChild(layer_select)
  return span;
}
function createSLAdd(id){
  return crEl({ el:'input', ats:{type: 'button', id: id, value: 'Add species', onclick: 'addSpecies(this)' } });
}


function updateSpeciesList(obj){
  var ns = obj.id.split('-')[1];
  var base_name = 'sp_list_';
  var list_id  = base_name + 'sp_list-'+ ns;
  var plot_id  = base_name + 'plot-'   + ns;
  var layer_id = base_name + 'layer-'  + ns;
  // console.log(ns);

  var old_sp_list = document.getElementById(list_id);
  var new_sp_list = createSpecieList(sp_list, list_id);
  old_sp_list.replaceWith(new_sp_list);

  var old_plot = document.getElementById(plot_id);
  var new_plot = createSelectPlot(plot_id);
  old_plot.replaceWith(new_plot);

  var old_layer = document.getElementById(layer_id);
  var new_layer = createSelectLayer(layer_id);
  old_layer.replaceWith(new_layer);
}
function stageSpecies(obj){
  var ns = obj.parentNode.parentNode.id.split('-')[1];
  var sp_staged = document.getElementById('sp_list_staged-' + ns);
  var sp = obj.value;
  obj.setAttribute("disabled", true);
  sp_staged.appendChild( createSpeciesButton({ sp: sp, to_stage: false }) );
}
function unStageSpecies(obj){
  // console.log(obj)
  var ns = obj.parentNode.parentNode.id.split('-')[1];
  var id = ns + '_sp_' + obj.value;
  var sp_button = document.getElementById(id);
  sp_button.removeAttribute("disabled");
  obj.remove();
}
function addSpecies(obj){
  // console.log(obj);
  // console.log(obj.id);
  var base_name = 'sp_list_';
  var ns = obj.id.split('-')[1];
  var staged = document.getElementById(base_name + 'staged-' + ns);
  var input  = document.getElementById(base_name + 'input_'  + ns);
  var plot   = document.getElementById(base_name + 'plot-'   + ns).children[0].value;
  var layer  = document.getElementById(base_name + 'layer-'  + ns).children[0].value;
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
function getChildrenValues(element){
  var values = [];
  for(let child of element.children){
    values.push(child.value);
  }
  return values;
}














// plot select
function createPlotSelect(tables, pl = 'PLOT'){
  var plot_list = uniq(getMultiTableInputs(tables, [pl])[pl]);
  var plot_select = createSelectOpt(plot_list, 0);
  plot_select.id = 'plot_select';
  return plot_select;
}
// layer select
function createLayerSelect(tables, ly = 'Layer'){
  var layer_list = uniq(getMultiTableOptions(tables, [ly])[ly]);
  var layer_select = createSelectOpt(layer_list, layer_list.length - 1);
  layer_select.id = 'layer_select';
  return layer_select;
}





// Helper functions for generateSpeciesTable()
// species list
function createSpeciesListTable(species, table_name, n=15){
  var table = crEl({ el: 'table', ats: {id: table_name} });
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


function generateSpeciesTable(species){
  var main = crEl({ el: 'span', ats: {id: 'species_list'} });
  main.appendChild( crEl({ el:'input', ats:{type:'button', id:'update_input_species_list', value: 'Update input species list', onclick: 'updateSpeciesList()'} }) );

  // species list
  main.appendChild(createSpeciesListTable(species, 'sp_list', 15));

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
