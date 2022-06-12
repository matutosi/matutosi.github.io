// https://phper.pro/352

function download(id){
  var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  //set encoding UTF-8 with BOM
  var table = document.getElementById(id);
  var data_tsv = "";                             // data_tsv is data holder

  for(var i = 0;  i < table.rows.length; i++) {
    for(var j = 0; j < table.rows[i].cells.length; j++) {
      data_tsv += table.rows[i].cells[j].innerText;           // save data in cellls
      if(j == table.rows[i].cells.length-1) data_tsv += "\n";  // add line break
      else data_tsv += "\t";                                   // add "\t" as separater
    }
  }

  var blob = new Blob([ bom, data_tsv], { "type" : "text/tsv" });  // download tsv data from data_tsv
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = getNow() + ".tsv";
  a.href = url;
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
  delete data_tsv;
}
