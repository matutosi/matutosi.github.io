// test for autoSave
function testSaveTable(){
  var table_data = "test_data";
  var f_name = "temp.txt";
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var blob = new Blob([bom, table_data], { "type" : "text/tsv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = f_name;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  delete table_data;
}
// setInterval(testSaveTable, 1000 * 2 );  // 1min: 1000ms * 60sec
// 
// function autoSave(){
//     console.log(getNow())
// // localStorage
// }
// setInterval(autoSave, 1000 * 60);  // 1min: 1000ms * 60sec
