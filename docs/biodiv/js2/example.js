function showExample(obj){
  // add plots
  addInputTab({ obj:document.getElementById('add_tab'), id:'biss01' });
  addInputTab({ obj:document.getElementById('add_tab'), id:'biss02' });

  // input data
  var tb_1 = document.getElementById('input_occ_biss01_tb');
  var tb_2 = document.getElementById('input_occ_biss02_tb');
  var ly = ['T1' ,  'T2',    'H',   'H',   'H'];
  var sp = ['sp1', 'sp2',  'sp3', 'sp4', 'sp5'];
  var cv = [  80 ,    40,       ,   1.5,   0.5];
  for(let i = 0; i < 3; i++){ addRowWithValues({ table: tb_1, values:{ Layer: ly[i], Species:sp[i], Cover:cv[i] } }); }
  for(let i = 2; i < 5; i++){ addRowWithValues({ table: tb_2, values:{ Layer: ly[i], Species:sp[i], Cover:cv[i] } }); }
  // delete default data
  for(let i = 1; i < 5; i++){ tb_1.rows[2].cells[1].firstChild.click(); }
  for(let i = 1; i < 5; i++){ tb_2.rows[2].cells[1].firstChild.click(); }

  // update "all inputs tables" and "input species list"
  document.getElementById('update_all_inputs_tables_button').click();
  // add species list
  var sp_nara   = grepArray(wamei, /ナラ/);
  var sp_buna   = grepArray(wamei, /ブナ/);
  var sp_kusu   = grepArray(wamei, /クス/);
  var sp_tabu   = grepArray(wamei, /タブ/);
  var sp_kaya   = grepArray(wamei, /カヤ/);
  var sp_susuki = grepArray(wamei, /ススキ/);
  addSLinLS(sp_nara  , 'nara');
  addSLinLS(sp_buna  , 'buna');
  addSLinLS(sp_kusu  , 'kusu');
  addSLinLS(sp_tabu  , 'tabu');
  addSLinLS(sp_kaya  , 'kaya');
  addSLinLS(sp_susuki, 'susuki');

  var base_name = 'sp_list_sp_list-';
  // console.log(getSLinLS());
  addSpeciesList(base_name + 'all'   , getSLinLS());
  addSpeciesList(base_name + 'biss01', getSLinLS());
  addSpeciesList(base_name + 'biss02', getSLinLS());

  //   document.getElementById('sp_list_update-all').click();
  document.getElementById('sp_list_update_pl-all').click();

  obj.remove();
}
