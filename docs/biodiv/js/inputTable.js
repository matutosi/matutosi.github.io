

// TODO: write documents
//    
//    
function createInputTd(dat_type, col_name, optional){
  // console.log(dat_type);
  // console.log(col_name);
  // console.log(optional);
  var td = document.createElement('td');
  var col_name = col_name.toLowerCase();
  switch(dat_type){
    case "auto": // date, no, GPS
      if(col_name === "date")   td.innerHTML = getNow();
      if(col_name === "loclat") td.innerHTML = getLat();
      if(col_name === "loclon") td.innerHTML = getLon();
      if(col_name === "locacc") td.innerHTML = getAcc();
      if(col_name === "no")     td.innerHTML = 1;
      break;
    case "button": // delButton, update button
      if(col_name === "delbutton")   { td.appendChild( createDelButton() );     };
      if(col_name === "updatebutton"){ td.appendChild( createUpdateButton()  ); };
      break;
    case "fixed":
      if(optional === ""){ 
//        alert("Fixed columns should be input!");
        var optional = "NO INPUT";
      }
      td.innerHTML = optional;
      break;
    case "checkbox":
    case "text":
      td.appendChild(createInput({ type: dat_type }));
      break;
    case "number":
      td.appendChild(createInput({ type: dat_type, inputmode: "numeric", min: "0"} ));
      break;
    case "list":
      arry_list = optional.split(':').concat(Array(""));
      td.appendChild(createSelectOpt(arry_list, arry_list.length - 1));
      break;
  }
  return td;
}
// Update "Date", "locLat", "locLon", "locAcc"
//    When "Update" bottun clicked, update informations in the row.
//    @paramas obj Clicked row.
//    @return null.
function updateTimeGPS(obj){
  // settings
  var cols = ["Date", "locLat", "locLon", "locAcc"];
  var funs = [getNow, getLat, getLon, getAcc]
  // clicked things
  var table = obj.parentNode.parentNode.parentNode;
  var tr = obj.parentNode.parentNode;
  var row_no = tr.sectionRowIndex;
  // update
  for(let i = 0; i < cols.length; i++){
    var col_no = getColNames(table).indexOf(cols[i]);
    var cell = table.rows[row_no].cells[col_no];
    cell.replaceWith( crEl({ el:'td', ih: funs[i]() }) );
  }
}

// Create delete button
function createDelButton(){
  return createInput({ type: "button", value: "DELETE", onclick: "delRow(this)" });
}

// Create update time and GPS button
function createUpdateButton(){
  return createInput({ type: "button", value: "Update Time & GPS", onclick: "updateTimeGPS(this)" });
}


