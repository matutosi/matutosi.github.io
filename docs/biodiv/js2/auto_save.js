function getAllPlotAsCSV(){
  var plot = getTableData( document.getElementById('plot_all_tb') );
  console.log(plot);
  var data = { plot: Object.assign({}, plot.biss_inputs) }
  console.log(data);
}

function getAllPlotAsCSV(){
  var occ  = getTableData( document.getElementById('occ_all_tb' ) );
  occ
  var data = { occ: Object.assign({}, occ.biss_inputs) }
  
  return csv;
}


function getAllPlotOccDataAsJSON(){
  var plot = getTableData( document.getElementById('plot_all_tb') );
  var occ  = getTableData( document.getElementById('occ_all_tb' ) );
  // need Object.assign({}, obj)
  var data = { plot: Object.assign({}, plot.biss_inputs), occ: Object.assign({}, occ.biss_inputs) }
  var json = JSON.stringify(data);
  return json;
}

// 
function autoSave(){
  var json = getAllPlotOccDataAsJSON();
  var f_name = 'biss_' + getNow() + '.json';
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var blob = new Blob([bom, json], { "type" : "text/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = f_name;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  delete json;
}

function changeAutoSaveSttting(obj){
  var n = obj.value;
  if(typeof timerId === 'undefined'){
    setAutoSave(Number(n));
  }else{
    clearInterval(timerId);
    if(n === 'no save'){
      return void 0;
    }else{
      setAutoSave(Number(n));
    }
  }
}

function setAutoSave(n){
  var min = 1000 * 60; // 1 min: 1000ms * 60sec
  // timerId: set as global object
  timerId = setInterval(autoSave, n * min );
}
