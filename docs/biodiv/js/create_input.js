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

function createDelButton(){
  return createInput({ type: "button", value: "DELETE", onclick: "delRow(this)" });
}
function createUpdateButton(){
  return createInput({ type: "button", value: "Update Time & GPS", onclick: "updateTimeGPS(this)" });
}
function createShortTable(){
  return createInput({ type:"button", value: "Short table", onclick: "shortTable(this)" });
}
function createWideTable(){
  return createInput({ type:"button", value: "Wide table", onclick: "wideTable(this)" });
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
function createSearchShowInput(){
  return createInput({ type:"text", placeholder: "Input text" });
}
function createSearchShowButton(){
  return createInput({ type: "button", value: "Search text", onclick: "searchTableTextShow(this)" });
}
function createNrowInput(){
  return createInput({ type: "number", value: "1", step: "1", min: "1", max:"20" });
}
function createAddRowButton(){
  return createInput({ type: "button", value: "Add row(s)", onclick: "addRows(this)" });
}
function createHideButton(){
  return createInput({ type: "button", value: "Hide table", onclick: "hideShowNext(this)" });
}
function createNewOccButton(){
  return createInput({ type: "button", value: "New occ table", onclick: "makeNewOccTableModule(this)" });
}
