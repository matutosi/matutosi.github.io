function showManual(){
  window.open("https://github.com/matutosi/biodiv/blob/main/man/01-howtouse.md");
}

function showExample(obj){

  // select settings: '_5_layers'
  changeSettingsByName('_5_layers');
  // delete 'rank' and 'abundance'
  document.querySelector("#_5_layers_occ_tb > tr:nth-child(7) > td:nth-child(4) > input[type=button]").click()
  document.querySelector("#_5_layers_occ_tb > tr:nth-child(7) > td:nth-child(4) > input[type=button]").click()

  // add plots
  addInputTab({ obj:document.getElementById('add_tab'), id:'biss01' });
  addInputTab({ obj:document.getElementById('add_tab'), id:'biss02' });

  // sample occ
  var tb_1 = document.getElementById('input_occ_biss01_tb');
  var tb_2 = document.getElementById('input_occ_biss02_tb');
  layers     = ['T1','T2','S1','S2','H'];
    // Identified species
  species    = ['sp01','sp02', 'sp03','sp04','sp05','sp06','sp07','sp08','sp09'];
  identified = ['checked'];
  addSampleOcc(tb_1, 6, layers, species, identified)
  addSampleOcc(tb_2, 5, layers, species, identified)
    // UN-identified species
  species    = ['sp11','sp12', 'sp13','sp14','sp15','sp16','sp17','sp18','sp19'];
  identified = [''];
  addSampleOcc(tb_1, 2, layers, species, identified)
  addSampleOcc(tb_2, 2, layers, species, identified)

  // delete default data
  for(let i = 1; i < 5; i++){ tb_1.rows[2].cells[1].firstChild.click(); }
  for(let i = 1; i < 5; i++){ tb_2.rows[2].cells[1].firstChild.click(); }

  // update "all inputs tables" and "input species list"
  var sp_nara   = grepArray(flora, /ナラ/);
  var sp_buna   = grepArray(flora, /ブナ/);
  var sp_kusu   = grepArray(flora, /クス/);
  var sp_tabu   = grepArray(flora, /タブ/);
  var sp_kaya   = grepArray(flora, /カヤ/);
  var sp_susuki = grepArray(flora, /ススキ/);
  addSLinLS(sp_nara  , 'nara');
  addSLinLS(sp_buna  , 'buna');
  addSLinLS(sp_kusu  , 'kusu');
  addSLinLS(sp_tabu  , 'tabu');
  addSLinLS(sp_kaya  , 'kaya');
  addSLinLS(sp_susuki, 'susuki');

  // all update
  updateInputsPlotLayerSpecies()

  tabs[tabs.length - 2].onclick();  // move tab

  obj.remove();
}

function addSampleOcc(plot, n ,layers, species, identified){
  var ly = randSample(n, layers,  false);
  var sp = randSample(n, species, false);
  var cv = randInt(n-1, 100).concat(['']);
  var cv = randSort(cv);
  var id = randSample(n, identified, false);
  for(let i = 0; i<n; i++){
    addRowWithValues({ table: plot, values:{ Layer: ly[i], Species:sp[i], Cover:cv[i], Identified: id[i] } }); 
  }
}
