function addComp(obj, sp = 'Species'){
  // var sp = 'Species';
  var ns = obj.id.split('-')[1];
  var id = 'sp_list_sp_list-'+ ns;
  var comp = document.getElementById('comp_table_tb');
  var sp_list = getColData(comp, sp);
  // console.log(sp_list);
  addSpeciesList(id, sp_list);
}
function createAddCompButton(id){
  return crEl({ el:'input', ats:{type:'button', id: id, value: 'Add from Composition', onclick: 'addComp(this)'} });
}

function createSpecieUlModule({ species, ns,
                                show_select_button   , show_button_update_sl, show_button_add_comp, 
                                show_select_ncol     , 
                                show_button_load_sl  , show_button_save_sl  , 
                                show_text_input      , 
                                show_button_update_pl, show_select_plot     , show_select_layer}){
  // var ns = 'all'; var species = sp_list;
  var base_name = 'sp_list_';
  var main             = createSpanWithId    ( base_name + 'module-'    + ns          );
  var select_button    = createSelectSL      ( base_name + 'select-'    + ns          );
  var button_update_sl = createUpdateSLButoon( base_name + 'update-'    + ns          );
  var button_add_comp  = createAddCompButton ( base_name + 'add_comp-'  + ns          );
  var select_ncol      = createSelectNumber  ( base_name + 'ncols-'     + ns          );

  var button_load_sl   = createLoadSLButton  ( base_name + 'load-'      + ns          );
  var button_save_sl   = createSaveSLButoon  ( base_name + 'save-'      + ns          );

  var staged           = createSpanWithId    ( base_name + 'staged-'    + ns          );
  var text_input       = createSLInput       ( base_name + 'input-'     + ns          );
  var button_update_pl = createUpdatePLButton( base_name + 'update_pl-' + ns          );
  var select_plot      = createSelectPlot    ( base_name + 'plot-'      + ns          );
  var select_layer     = createSelectLayer   ( base_name + 'layer-'     + ns          );
  var button_add       = createSLAdd         ( base_name + 'add-'       + ns          );
  var sp_list          = createSpecieList    ( base_name + 'sp_list-'   + ns, species );

  main.appendChild( select_button       );
  main.appendChild( button_update_sl    );
  main.appendChild( button_add_comp     );
  main.appendChild( select_ncol         );
  main.appendChild( crEl({ el: 'br' })  );
  main.appendChild( button_load_sl      );
  main.appendChild( button_save_sl      );
  main.appendChild( crEl({ el: 'br' })  );
  main.appendChild( staged              );
  main.appendChild( crEl({ el: 'br' })  );
  main.appendChild( text_input          );
  main.appendChild( crEl({ el: 'br' })  );
  main.appendChild( button_update_pl    );
  main.appendChild( select_plot         );
  main.appendChild( select_layer        );
  main.appendChild( button_add          );
  main.appendChild( sp_list             );
  main.appendChild( crEl({el:'hr'})     );

  if( show_select_button    === void 0){ select_button      .style.display = "none"; }
  if( show_button_update_sl === void 0){ button_update_sl   .style.display = "none"; }
  if( show_button_add_comp  === void 0){ button_add_comp    .style.display = "none"; }
  if( show_select_ncol      === void 0){ select_ncol        .style.display = "none"; }
  if( show_button_load_sl   === void 0){ button_load_sl     .style.display = "none"; }
  if( show_button_save_sl   === void 0){ button_save_sl     .style.display = "none"; }
  if( show_text_input       === void 0){ text_input         .style.display = "none"; }
  if( show_button_update_pl === void 0){ button_update_pl   .style.display = "none"; }
  if( show_select_plot      === void 0){ select_plot        .style.display = "none"; }
  if( show_select_layer     === void 0){ select_layer       .style.display = "none"; }

  return main;
}

// span
function createSpanWithId(id){
  return crEl({ el: 'span', ats:{ id: id} });
}

// Select species list
function createUpdateSLButoon(id){
  return crEl({ el:'input', ats:{type:'button', id: id, value: 'Update select list', onclick: 'updateSelectSL(this)'} });
}
function createSelectSL(id){
  var span = crEl({ el:'span', ih: '<b>Select pecies list:</b>' });
  var ns = id.split('-')[1];
  var select = createSL(id);
  span.appendChild(select);
  return span;
}
function updateSelectSL(obj){
  //   var id = this.id;
  // console.log(id);
  var id = obj.id.replace('update', 'select');
  var old_select = document.getElementById(id);
  var new_select = createSL(id);
  old_select.replaceWith(new_select);
}
function createSL(id){
  var species_list = replaceArrayAll(getKeysOfSLinLS(), 'biss_sl-', '');
  species_list.unshift('NEW');
  var select = createSelectOpt(species_list, 0, id);
  select.setAttribute('onchange', 'changeSL(this)');
  return select
}
function changeSL(obj){
  var id = 'sp_list_sp_list-' + obj.id.split('-')[1];
  var ns = obj.value;
  // console.log(id);
  replaceSpeciesList(ns, id);
}

// Load 
//   @param obj  A input element.
//                 Normally use "this". 
async function loadSL(obj){
  var text = await readFile(obj.files[0]);
  var add_sp = text.replaceAll('\r', '').split(/[,\n]/);
  // console.log(text);
  // console.log(add_sp);
  var ns = obj.id.split('-')[1];
  var id = 'sp_list_sp_list-'+ ns;
  addSpeciesList(id, add_sp);
  obj.value = '';  // for select the same file twice or more
}
// Helper function
function readFile(file){
  // https://www.delftstack.com/ja/howto/javascript/open-local-text-file-using-javascript/
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = x=> resolve(reader.result);
    reader.readAsText(file);
  })
}
function createLoadSLButton(id){
  var span = crEl({el:'span', ih: "<b>Add species to list:</b>" });
  var file_input = crEl({ el:'input', ats:{ type: "file", id: id, onchange: "loadSL(this)" } });
  span.appendChild(file_input);
  return span;
}

// Save
function createSaveSLButoon(id){
  var ns = id.split('-')[1];
  var span = crEl({ el:'span' });
  var select = createSelectOpt(['file', 'browser'], 0, 'sp_list_which-' + ns);
  var input = crEl({ el:'input', ats:{type:'text', id: id, placeholder: 'File name'} });
  var button = crEl({ el:'input', ats:{type:'button', id: id, value: 'Save', onclick: 'saveSL(this)'} });
  span.appendChild(select);
  span.appendChild(input);
  span.appendChild(button);
  return span;
}
function saveSL(obj){
  var id      = obj.id;
  var ns      = id.split('-')[1];
  var f_name  = document.getElementById('sp_list_save-' + ns).value;
  var which   = document.getElementById('sp_list_which-' + ns).value;
  var ul      = document.getElementById('sp_list_sp_list-' + ns);
  var sp_list = getGrandChildrenValues(ul);
  if(f_name === ""){ 
    alert('Input file name!');
    return void 0;
  }
  // console.log(name   );
  // console.log(which  );
  // console.log(sp_list);
  if(which === 'browser'){ addSLinLS(sp_list, f_name); }
  if(which === 'file'   ){ downloadStrings(strings = sp_list, file_name = f_name + '.txt'); }
  document.getElementById('sp_list_save-' + ns).value = '';  // clear file name
}

// No. of columns
function createSelectNumber(id){
  var span = crEl({el:'span', ih: "<b>No. of Column:</b>" });
  var select = createSelectOpt([1,2,3,4,5,6,7,8,9], 5, id);
  select.setAttribute('onchange', 'changeUlColumns(this)');
  span.appendChild(select);
  return span;
}
function changeUlColumns(obj){
  var ncols = obj.value;
  document.documentElement.style.setProperty('--cc', ncols);
}

// Species list
function createSpecieList(id, species){
  var ns = id.split('-')[1];
  var ul = crEl({ el:'ul', ats:{id: id} });
  // console.log(species);
  for(let sp of species){
    var li = crEl({ el:'li' })
    var button = createSpeciesButton({ sp: sp, to_stage: true, ns: ns })
    li.appendChild(button);
    ul.appendChild(li);
  }
  return ul;
}
function replaceSpeciesList(ns, id){
  if(ns === 'NEW'){
    var new_sp_list = createSpecieList(id, '');
  }else{
    var new_sp_list = createSpecieList(id, getSLinLS(ns));
  }
  var old_sp_list = document.getElementById(id);
  old_sp_list.replaceWith(new_sp_list);
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
function createSLInput(id){
  var placeholder = "Input species (separate with ',')";
  return crEl({ el:'input', ats:{type: 'text', id: id, placeholder: placeholder, size:'100'} });
}

// Plot and Layer
function createUpdatePLButton(id){
  return crEl({ el:'input', ats:{type:'button', id: id, value: 'Update plot and layer', onclick: 'updatePlotLayer(this)'} });
}
function createSelectPlot(id){
  var span = crEl({ el:'span', ih: 'PLOT:' });
  var ns = id.split('-')[1];
  if(ns === 'all' || ns === 'wamei'){
    var tables = document.querySelectorAll("table[id^='input_occ']");
    var pl = 'PLOT';
    var plot_list = uniq(getMultiTableInputs(tables, [pl])[pl]);
  }else{
    var plot_list = [ns];
  }
  var plot_select = createSelectOpt(plot_list, 0, id);
  span.appendChild(plot_select)
  return span;
}
function createSelectLayer(id){
  var span = crEl({ el:'span', ih: 'Layer:' });
  var tables = document.querySelectorAll("table[id^='input_occ']");
  var ly = 'Layer';
  // console.log(getMultiTableOptions(tables, [ly]));
  var layer_list = uniq(getMultiTableOptions(tables, [ly])[ly]);
  var layer_select = createSelectOpt(layer_list, layer_list.length - 1, id);
  span.appendChild(layer_select)
  return span;
}
function updatePlotLayer(obj){
  var ns = obj.id.split('-')[1];
  // console.log(ns);
  var base_name = 'sp_list_';
  //   var list_id  = base_name + 'sp_list-'+ ns;
  //   addSpeciesList(list_id, '');
  var plot_id  = base_name + 'plot-'   + ns;
  var layer_id = base_name + 'layer-'  + ns;
  replaceSelectPlot (    plot_id);
  replaceSelectLayer(    layer_id);
}
function replaceSelectPlot(id){
  var old_plot = document.getElementById(id).parentNode;
  var new_plot = createSelectPlot(id);
  old_plot.replaceWith(new_plot);
}
function replaceSelectLayer(id){
  var old_layer = document.getElementById(id).parentNode;
  var new_layer = createSelectLayer(id);
  old_layer.replaceWith(new_layer);
}

// Add species
function createSLAdd(id){
  return crEl({ el:'input', ats:{type: 'button', id: id, value: 'Add species to PLOT', onclick: 'addSpecies(this)' } });
}
function addSpeciesList(id, add_sp){
  var old_sp_list = document.getElementById(id);
  // console.log(id);
  var old_sp = getGrandChildrenValues( old_sp_list );
  if(old_sp === void 0) var old_sp = '';
  var new_sp = uniq(old_sp.concat(add_sp)).sort();
  if(new_sp.indexOf('') >= 0){ new_sp.splice(new_sp.indexOf(''), 1); }  // remove ''
  var new_sp_list = createSpecieList(id, new_sp);
  old_sp_list.replaceWith(new_sp_list);
}
function stageSpecies(obj){
  var ns = obj.parentNode.parentNode.id.split('-')[1];
  var sp_staged = document.getElementById('sp_list_staged-' + ns);
  var sp = obj.value;
  obj.setAttribute("disabled", true);
  var button = createSpeciesButton({ sp: sp, to_stage: false, ns: ns });
  sp_staged.appendChild( button );
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
  var staged  = document.getElementById(base_name + 'staged-' + ns);
  var input   = document.getElementById(base_name + 'input-'  + ns);
  var plot    = document.getElementById(base_name + 'plot-'   + ns).value;
  var layer   = document.getElementById(base_name + 'layer-'  + ns).value;
  var species = getChildrenValues(staged);
  if(input.value !== ''){ var species = species.concat(input.value.split(',')); }
  // add species
  var table = document.getElementById('input_occ_' + plot + '_tb');
  for(let spec of species){
    var [sp, sa] = spec.split('_');
    if(sa === void 0) var sa = '';
  // console.log(layer);
    addRowWithValues({ table: table, values: {Layer: layer, Species: sp, SameAs: sa} });
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

function getGrandChildrenValues(element){
  var values = [];
  for(let child of element.children){
    for(let ch of child.children){
      values.push(ch.value);
    }
  }
  return values;
}
