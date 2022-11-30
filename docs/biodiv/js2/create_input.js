// Helper to create input tag with attributes such as class, id, type, value, and placeholder.
//    @param ...args Some arguments.
//    @return  An input element.
//    @examples
//    createInput({ type: "text", value: "Val"});
//    createInput({ type: "button", value: "Push here"});
function createInput( ...args ){
  var input = document.createElement('input');
  var keys  = Object.keys(args[0]);
  for(let key of keys){
    input.setAttribute(key, args[0][key]);
  }
  return input;
}

function updateAllInputsTablesButton(){
  return crEl({ el:'input', ats:{type:'button', id:'update_all_inputs_tables_button', value:'Update all inputs tables', onclick: 'updateAllInputsTables(this)'} });
}
function createDelButton(){
  return createInput({ type: "button", value: "DELETE", onclick: "delRow(this)" });
}
function createUpdateButton(){
  return createInput({ type: "button", value: "UPDATE_TIME_GPS", onclick: "updateTimeGPS(this)" });
}
function createStartGPSButton(){
  return createInput({ type: "button", value: "Start GPS", onclick: "startGPS(this)" });
}
function createStopGPSButton(){
  return createInput({ type: "button", value: "Stop GPS", onclick: "stopGPS(this)" });
}
function createFitTable(id){
  return createInput({ type:"button", value: "Fit width", onclick: "shortTable(this)", id: id});
}
function createWideTable(){
  return createInput({ type:"button", value: "Extend width", onclick: "wideTable(this)" });
}
function createHideRowButton(row = "row"){
  return createInput({ type:"button", value: "Hide " + row, onclick: "hideRow(this)" });
}
function createShowRowButton(row = "row"){
  return createInput({ type:"button", value: "Show " + row, onclick: "showRow(this)" });
}
function createMakePlotButton(){
  return createInput({ type:"button", value: "Make plot table", onclick: "makePlotInputModule(this)" });
}
function createFileButton(){
  return createInput({ type: "file", accept: ".conf", onchange: "replaceTable(this)" });
}
function createSaveSettingButton(){
  return createInput({ type: "button", value: "Save settings", onclick: "saveSettings(this)" });
}
function createSaveButton(){
  return createInput({ type: "button", value: "Save", onclick: "saveSettings(this)" });
}
function createSaveInputButton(){
  return createInput({ type: "button", value: "Save inputs", onclick: "saveInputs(this)" });
}
function createShowColButton(c_name){
  return createInput({ type: "Button", value: c_name, onclick: "showCol(this)" });
}
function createSumButton(){
  return createInput({ type: "Button", value: "Calculate", onclick: "sumWithGroup(this)" });
}
function createSearchInput(){
  return createInput({ type:"text", onkeyup: "searchTableText(this)", placeholder: "Search text" });
}
function createSearchShowInput(id=''){
  return crEl({ el:'input', ats:{type:'text', id: id, placeholder: "Input text"} });
}
function createSearchShowButton(){
  return createInput({ type: "button", value: "Search text", onclick: "searchTableTextShow(this)" });
}
function createNrowInput(id){
  return createInput({ type: "number", value: "1", step: "1", min: "1", max:"20", id: id });
}
function createAddRowButton(id){
  return createInput({ type: "button", value: "Add row(s)", onclick: "addRows(this)", id: id });
}
function createHideButton(){
  return createInput({ type: "button", value: "Hide table", onclick: "hideShowNext(this)" });
}
function createNewOccButton(){
  return createInput({ type: "button", value: "New occ table", onclick: "makeNewOccTableModule(this)" });
}
